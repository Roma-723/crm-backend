import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
export declare class PayrollController {
    private payrollService;
    constructor(payrollService: PayrollService);
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
    findByUser(userId: string, req: any): any[] | import(".prisma/client").Prisma.PrismaPromise<({
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
    generatePayroll(month: string): Promise<any[]>;
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
}
