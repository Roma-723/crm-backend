import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddProjectUserDto } from './dto/add-project-user.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    findAllProjects(): import(".prisma/client").Prisma.PrismaPromise<({
        users: ({
            user: {
                name: string;
                email: string;
                avatar: string;
                id: string;
            };
        } & {
            role: string | null;
            id: string;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        tasks: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: string;
            area: number;
            pricePerM2: number;
            deadline: string | null;
            done: boolean;
            assignedUserId: string | null;
            projectId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        clientName: string;
        startDate: string;
        endDate: string | null;
    })[]>;
    findOneProject(id: string): Promise<{
        users: ({
            user: {
                name: string;
                email: string;
                avatar: string;
                id: string;
            };
        } & {
            role: string | null;
            id: string;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        tasks: ({
            assignedUser: {
                name: string;
                email: string;
                avatar: string;
                id: string;
            };
        } & {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: string;
            area: number;
            pricePerM2: number;
            deadline: string | null;
            done: boolean;
            assignedUserId: string | null;
            projectId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        clientName: string;
        startDate: string;
        endDate: string | null;
    }>;
    createProject(dto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        users: ({
            user: {
                name: string;
                email: string;
                id: string;
            };
        } & {
            role: string | null;
            id: string;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        tasks: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: string;
            area: number;
            pricePerM2: number;
            deadline: string | null;
            done: boolean;
            assignedUserId: string | null;
            projectId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        clientName: string;
        startDate: string;
        endDate: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateProject(id: string, dto: UpdateProjectDto): Promise<{
        users: ({
            user: {
                name: string;
                email: string;
                id: string;
            };
        } & {
            role: string | null;
            id: string;
            createdAt: Date;
            userId: string;
            projectId: string;
        })[];
        tasks: ({
            assignedUser: {
                name: string;
                email: string;
                id: string;
            };
        } & {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: string;
            area: number;
            pricePerM2: number;
            deadline: string | null;
            done: boolean;
            assignedUserId: string | null;
            projectId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        clientName: string;
        startDate: string;
        endDate: string | null;
    }>;
    removeProject(id: string): Promise<{
        message: string;
    }>;
    createTask(projectId: string, dto: CreateTaskDto): Promise<{
        assignedUser: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: string;
        area: number;
        pricePerM2: number;
        deadline: string | null;
        done: boolean;
        assignedUserId: string | null;
        projectId: string;
    }>;
    updateTask(projectId: string, taskId: string, dto: UpdateTaskDto): Promise<{
        assignedUser: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: string;
        area: number;
        pricePerM2: number;
        deadline: string | null;
        done: boolean;
        assignedUserId: string | null;
        projectId: string;
    }>;
    toggleTaskDone(projectId: string, taskId: string): Promise<{
        assignedUser: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: string;
        area: number;
        pricePerM2: number;
        deadline: string | null;
        done: boolean;
        assignedUserId: string | null;
        projectId: string;
    }>;
    removeTask(projectId: string, taskId: string): Promise<{
        message: string;
    }>;
    getProjectUsers(projectId: string): Promise<({
        user: {
            name: string;
            email: string;
            avatar: string;
            id: string;
        };
    } & {
        role: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
    })[]>;
    addProjectUser(projectId: string, dto: AddProjectUserDto): Promise<{
        user: {
            name: string;
            email: string;
            avatar: string;
            id: string;
        };
    } & {
        role: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
    }>;
    removeProjectUser(projectId: string, userId: string): Promise<{
        message: string;
    }>;
}
