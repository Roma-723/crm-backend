import { SalaryService } from './salary.service';
export declare class SalaryController {
    private salaryService;
    constructor(salaryService: SalaryService);
    getSalaryByUser(userId: string, req: any): Promise<{
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
    }> | {
        error: string;
    };
    getMonthlySalary(userId: string, month: string, req: any): Promise<{
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
    }> | {
        error: string;
    };
}
