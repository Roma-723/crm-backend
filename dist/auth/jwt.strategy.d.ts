import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
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
    }>;
}
export {};
