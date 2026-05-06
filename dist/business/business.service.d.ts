import { PrismaService } from '../prisma/prisma.service';
export declare class BusinessService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllNalogs(userId: string, month?: number, year?: number): Promise<{
        data: {
            type: string;
            id: string;
            createdAt: Date;
            date: Date;
            userId: string;
            amount: number;
            note: string | null;
        }[];
        total: number;
        totalAmount: number;
    }>;
    createNalog(userId: string, dto: any): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        note: string | null;
    }>;
    getAllArendas(userId: string, month?: number, year?: number): Promise<{
        data: {
            object: string;
            id: string;
            createdAt: Date;
            userId: string;
            status: string;
            amount: number;
            month: number;
            note: string | null;
            year: number;
        }[];
        total: number;
        totalAmount: number;
    }>;
    createArenda(userId: string, dto: any): Promise<{
        object: string;
        id: string;
        createdAt: Date;
        userId: string;
        status: string;
        amount: number;
        month: number;
        note: string | null;
        year: number;
    }>;
    getAllIncomes(userId: string, month?: number, year?: number): Promise<{
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            date: Date;
            userId: string;
            amount: number;
            category: string;
        }[];
        total: number;
        totalAmount: number;
        byCategory: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.IncomeGroupByOutputType, "category"[]> & {
            _sum: {
                amount: number;
            };
        })[];
    }>;
    createIncome(userId: string, dto: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        category: string;
    }>;
    getAllExpenses(userId: string, month?: number, year?: number): Promise<{
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            date: Date;
            userId: string;
            amount: number;
            category: string;
        }[];
        total: number;
        totalAmount: number;
        byCategory: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ExpenseGroupByOutputType, "category"[]> & {
            _sum: {
                amount: number;
            };
        })[];
    }>;
    createExpense(userId: string, dto: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        category: string;
    }>;
    getAllUtilities(userId: string, month?: number, year?: number): Promise<{
        data: {
            type: string;
            id: string;
            createdAt: Date;
            userId: string;
            amount: number;
            month: number;
            year: number;
            meter: string | null;
        }[];
        total: number;
        totalAmount: number;
        byType: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.UtilityGroupByOutputType, "type"[]> & {
            _sum: {
                amount: number;
            };
        })[];
    }>;
    createUtility(userId: string, dto: any): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        month: number;
        year: number;
        meter: string | null;
    }>;
    getAllMaterials(userId: string, month?: number, year?: number): Promise<{
        data: {
            name: string;
            id: string;
            createdAt: Date;
            date: Date;
            userId: string;
            quantity: number;
            price: number;
            supplier: string | null;
        }[];
        total: number;
        totalAmount: number;
    }>;
    createMaterial(userId: string, dto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        quantity: number;
        price: number;
        supplier: string | null;
    }>;
    getAllAvans(userId: string, month?: number, year?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            date: Date;
            userId: string;
            status: string;
            amount: number;
            employeeId: string | null;
            person: string;
            purpose: string;
        }[];
        total: number;
        totalAmount: number;
    }>;
    createAvans(userId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        status: string;
        amount: number;
        employeeId: string | null;
        person: string;
        purpose: string;
    }>;
    getDashboardSummary(userId: string, month: number, year: number): Promise<{
        income: {
            total: number;
        };
        expenses: {
            total: number;
            salary: number;
            nalog: number;
            arenda: number;
            avans: number;
            materials: number;
            utilities: number;
            other: number;
        };
        utilities: {
            total: number;
        };
        netProfit: number;
    }>;
    getMonthlyChart(userId: string, year: number): Promise<{
        name: string;
        income: number;
        expense: number;
    }[]>;
    updateAvans(id: string, userId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        status: string;
        amount: number;
        employeeId: string | null;
        person: string;
        purpose: string;
    }>;
    deleteItem(model: string, id: string, userId: string): Promise<any>;
}
