import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    updateProfile(req: {
        user: {
            id: string;
        };
    }, dto: UpdateProfileDto): Promise<{
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
    findOne(id: string, req: {
        user: {
            id: string;
            role: string;
        };
    }): Promise<{
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
    }> | {
        error: string;
    };
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
