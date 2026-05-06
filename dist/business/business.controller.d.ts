import { BusinessService } from './business.service';
export declare class BusinessController {
    private readonly businessService;
    constructor(businessService: BusinessService);
    getNalogs(req: any, month?: number, year?: number): Promise<{
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
    createNalog(req: any, dto: any): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        note: string | null;
    }>;
    getArendas(req: any, month?: number, year?: number): Promise<{
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
    createArenda(req: any, dto: any): Promise<{
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
    getIncomes(req: any, month?: number, year?: number): Promise<{
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
    createIncome(req: any, dto: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        category: string;
    }>;
    getExpenses(req: any, month?: number, year?: number): Promise<{
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
    createExpense(req: any, dto: any): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        amount: number;
        category: string;
    }>;
    getUtilities(req: any, month?: number, year?: number): Promise<{
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
    createUtility(req: any, dto: any): Promise<{
        type: string;
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        month: number;
        year: number;
        meter: string | null;
    }>;
    getMaterials(req: any, month?: number, year?: number): Promise<{
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
    createMaterial(req: any, dto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        quantity: number;
        price: number;
        supplier: string | null;
    }>;
    getAvans(req: any, month?: number, year?: number): Promise<{
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
    createAvans(req: any, dto: any): Promise<{
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
    updateAvans(req: any, id: string, dto: any): Promise<{
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
    getSummary(req: any, month: number, year: number): Promise<{
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
    getMonthlyChart(req: any, year: number): Promise<{
        name: string;
        income: number;
        expense: number;
    }[]>;
    deleteItem(req: any, model: string, id: string): Promise<any>;
}
