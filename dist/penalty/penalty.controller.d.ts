import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
export declare class PenaltyController {
    private penaltyService;
    constructor(penaltyService: PenaltyService);
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
    create(dto: CreatePenaltyDto): import(".prisma/client").Prisma.Prisma__PenaltyClient<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        comment: string | null;
        reason: string;
        amount: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdatePenaltyDto): Promise<{
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
