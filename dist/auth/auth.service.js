"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const prisma_service_1 = require("../prisma/prisma.service");
const MAX_ATTEMPTS = 5;
const CODE_TTL_MINUTES = 10;
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already in use');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { ...dto, password: hashed, role: dto.role || 'user' },
        });
        const { password, ...userWithoutPassword } = user;
        const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
        return { user: userWithoutPassword, token };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const { password, ...userWithoutPassword } = user;
        const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
        return { user: userWithoutPassword, token };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            return { message: 'If this email exists, a code has been sent' };
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);
        await this.prisma.passwordReset.deleteMany({ where: { email: dto.email } });
        await this.prisma.passwordReset.create({
            data: { email: dto.email, code, expiresAt },
        });
        const emailConfigured = process.env.MAIL_PASS &&
            process.env.MAIL_PASS !== 'your_app_password_here';
        if (emailConfigured) {
            try {
                await this.sendCodeEmail(dto.email, code);
            }
            catch (emailErr) {
                console.warn('[ForgotPassword] Email send failed:', emailErr?.message);
            }
        }
        else {
            console.log(`[DEV] Reset code for ${dto.email}: ${code}`);
        }
        const isDev = !emailConfigured;
        return {
            message: 'If this email exists, a code has been sent',
            ...(isDev && { devCode: code }),
        };
    }
    async verifyCode(dto) {
        const record = await this.prisma.passwordReset.findFirst({
            where: { email: dto.email, verified: false },
            orderBy: { createdAt: 'desc' },
        });
        if (!record)
            throw new common_1.BadRequestException('Invalid or expired code');
        if (record.attempts >= MAX_ATTEMPTS) {
            await this.prisma.passwordReset.delete({ where: { id: record.id } });
            throw new common_1.BadRequestException('Too many attempts. Request a new code');
        }
        if (new Date() > record.expiresAt) {
            await this.prisma.passwordReset.delete({ where: { id: record.id } });
            throw new common_1.BadRequestException('Code expired. Request a new one');
        }
        if (record.code !== dto.code) {
            await this.prisma.passwordReset.update({
                where: { id: record.id },
                data: { attempts: record.attempts + 1 },
            });
            throw new common_1.BadRequestException('Invalid code');
        }
        await this.prisma.passwordReset.update({
            where: { id: record.id },
            data: { verified: true },
        });
        return { message: 'Code verified successfully' };
    }
    async resetPassword(dto) {
        const record = await this.prisma.passwordReset.findFirst({
            where: { email: dto.email, verified: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!record)
            throw new common_1.BadRequestException('Please verify your code first');
        if (new Date() > record.expiresAt) {
            await this.prisma.passwordReset.delete({ where: { id: record.id } });
            throw new common_1.BadRequestException('Session expired. Start over');
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        await this.prisma.user.update({
            where: { email: dto.email },
            data: { password: hashed },
        });
        await this.prisma.passwordReset.deleteMany({ where: { email: dto.email } });
        return { message: 'Password updated successfully' };
    }
    async sendCodeEmail(to, code) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.MAIL_FROM || 'WorkForce CRM',
            to,
            subject: 'Password Reset Code — WorkForce CRM',
            html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px">
          <h2 style="color:#1d4ed8;margin-bottom:8px">WorkForce CRM</h2>
          <p style="color:#374151;margin-bottom:24px">Your password reset code:</p>
          <div style="background:#1d4ed8;color:#fff;font-size:32px;font-weight:700;letter-spacing:12px;text-align:center;padding:20px;border-radius:10px">
            ${code}
          </div>
          <p style="color:#6b7280;font-size:13px;margin-top:24px">
            This code expires in ${CODE_TTL_MINUTES} minutes.<br/>
            If you didn't request this, ignore this email.
          </p>
        </div>
      `,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map