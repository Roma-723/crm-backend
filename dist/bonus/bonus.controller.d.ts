import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
export declare class BonusController {
    private bonusService;
    constructor(bonusService: BonusService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        comment: string | null;
        reason: string;
        amount: number;
    })[]>;
    findByUser(userId: string, req: any): any[] | import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        comment: string | null;
        reason: string;
        amount: number;
    }[]>;
    create(dto: CreateBonusDto): import(".prisma/client").Prisma.Prisma__BonusClient<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        comment: string | null;
        reason: string;
        amount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateBonusDto): Promise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        comment: string | null;
        reason: string;
        amount: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
