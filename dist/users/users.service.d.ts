import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    create(dto: CreateUserDto): Promise<{
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
    update(id: string, dto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
