import { PrismaService } from '../prisma/prisma.service';
export declare class SalaryService {
    private prisma;
    constructor(prisma: PrismaService);
    private calcAbsenceDeduction;
    private calcLateDeduction;
    getSalaryByUser(userId: string): Promise<{
        userId: string;
        userName: string;
        baseSalary: number;
        totalBonuses: number;
        totalPenalties: number;
        absentDays: number;
        absenceDeduction: number;
        totalLateHours: number;
        lateDeduction: number;
        finalSalary: number;
        bonuses: {
            id: string;
            createdAt: Date;
            date: string;
            userId: string;
            comment: string | null;
            reason: string;
            amount: number;
        }[];
        penalties: {
            id: string;
            createdAt: Date;
            date: string;
            userId: string;
            comment: string | null;
            reason: string;
            amount: number;
        }[];
    }>;
    getMonthlySalary(userId: string, month: string): Promise<{
        userId: string;
        month: string;
        userName: string;
        baseSalary: number;
        totalBonuses: number;
        totalPenalties: number;
        absentDays: number;
        absenceDeduction: number;
        totalLateHours: number;
        lateDeduction: number;
        finalSalary: number;
        bonuses: {
            id: string;
            createdAt: Date;
            date: string;
            userId: string;
            comment: string | null;
            reason: string;
            amount: number;
        }[];
        penalties: {
            id: string;
            createdAt: Date;
            date: string;
            userId: string;
            comment: string | null;
            reason: string;
            amount: number;
        }[];
    }>;
}
