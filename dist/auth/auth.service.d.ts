import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        user: {
            name: string;
            email: string;
            phone: string | null;
            age: number | null;
            avatar: string | null;
            salary: number;
            role: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            name: string;
            email: string;
            phone: string | null;
            age: number | null;
            avatar: string | null;
            salary: number;
            role: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    } | {
        devCode: string;
        message: string;
    }>;
    verifyCode(dto: VerifyCodeDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private sendCodeEmail;
}
