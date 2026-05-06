import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

const MAX_ATTEMPTS = 5;
const CODE_TTL_MINUTES = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed, role: dto.role || 'user' },
    });

    const { password, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: userWithoutPassword, token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { password, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return { user: userWithoutPassword, token };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    // Always return same message — don't reveal if email exists
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) return { message: 'If this email exists, a code has been sent' };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

    // Remove old codes for this email
    await this.prisma.passwordReset.deleteMany({ where: { email: dto.email } });

    await this.prisma.passwordReset.create({
      data: { email: dto.email, code, expiresAt },
    });

    const emailConfigured =
      process.env.MAIL_PASS &&
      process.env.MAIL_PASS !== 'your_app_password_here';

    if (emailConfigured) {
      try {
        await this.sendCodeEmail(dto.email, code);
      } catch (emailErr: any) {
        console.warn('[ForgotPassword] Email send failed:', emailErr?.message);
      }
    } else {
      console.log(`[DEV] Reset code for ${dto.email}: ${code}`);
    }

    const isDev = !emailConfigured;
    return {
      message: 'If this email exists, a code has been sent',
      ...(isDev && { devCode: code }),
    };
  }

  async verifyCode(dto: VerifyCodeDto) {
    const record = await this.prisma.passwordReset.findFirst({
      where: { email: dto.email, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) throw new BadRequestException('Invalid or expired code');

    if (record.attempts >= MAX_ATTEMPTS) {
      await this.prisma.passwordReset.delete({ where: { id: record.id } });
      throw new BadRequestException('Too many attempts. Request a new code');
    }

    if (new Date() > record.expiresAt) {
      await this.prisma.passwordReset.delete({ where: { id: record.id } });
      throw new BadRequestException('Code expired. Request a new one');
    }

    if (record.code !== dto.code) {
      await this.prisma.passwordReset.update({
        where: { id: record.id },
        data: { attempts: record.attempts + 1 },
      });
      throw new BadRequestException('Invalid code');
    }

    await this.prisma.passwordReset.update({
      where: { id: record.id },
      data: { verified: true },
    });

    return { message: 'Code verified successfully' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.prisma.passwordReset.findFirst({
      where: { email: dto.email, verified: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) throw new BadRequestException('Please verify your code first');

    if (new Date() > record.expiresAt) {
      await this.prisma.passwordReset.delete({ where: { id: record.id } });
      throw new BadRequestException('Session expired. Start over');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { password: hashed },
    });

    await this.prisma.passwordReset.deleteMany({ where: { email: dto.email } });

    return { message: 'Password updated successfully' };
  }

  private async sendCodeEmail(to: string, code: string) {
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
}
