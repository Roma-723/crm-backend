import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
export declare class PayrollService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            salary: number;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        month: string;
        totalSalary: number;
        paidAmount: number;
        remainingAmount: number;
        notes: string | null;
    })[]>;
    findByUser(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            salary: number;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        month: string;
        totalSalary: number;
        paidAmount: number;
        remainingAmount: number;
        notes: string | null;
    })[]>;
    create(dto: CreatePayrollDto): import(".prisma/client").Prisma.Prisma__PayrollRecordClient<{
        user: {
            name: string;
            email: string;
            salary: number;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        month: string;
        totalSalary: number;
        paidAmount: number;
        remainingAmount: number;
        notes: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdatePayrollDto): Promise<{
        user: {
            name: string;
            email: string;
            salary: number;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        month: string;
        totalSalary: number;
        paidAmount: number;
        remainingAmount: number;
        notes: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    generatePayrollForMonth(month: string): Promise<any[]>;
}
