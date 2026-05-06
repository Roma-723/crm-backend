import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            avatar: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        status: string;
        comment: string | null;
        reason: string | null;
        lateHours: number;
    })[]>;
    findByUser(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        status: string;
        comment: string | null;
        reason: string | null;
        lateHours: number;
    }[]>;
    create(dto: CreateAttendanceDto): Promise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        status: string;
        comment: string | null;
        reason: string | null;
        lateHours: number;
    }>;
    bulkCreate(records: CreateAttendanceDto[]): Promise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        status: string;
        comment: string | null;
        reason: string | null;
        lateHours: number;
    }[]>;
    update(id: string, dto: UpdateAttendanceDto): Promise<{
        id: string;
        createdAt: Date;
        date: string;
        userId: string;
        status: string;
        comment: string | null;
        reason: string | null;
        lateHours: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
