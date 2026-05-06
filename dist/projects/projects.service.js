"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAllProjects() {
        return this.prisma.project.findMany({
            include: {
                tasks: { orderBy: { createdAt: 'desc' } },
                users: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOneProject(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                tasks: { include: { assignedUser: { select: { id: true, name: true, email: true, avatar: true } } }, orderBy: { createdAt: 'desc' } },
                users: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    createProject(dto) {
        return this.prisma.project.create({
            data: {
                name: dto.name,
                clientName: dto.clientName,
                startDate: dto.startDate,
                endDate: dto.endDate,
                status: dto.status || 'active',
            },
            include: {
                tasks: true,
                users: { include: { user: { select: { id: true, name: true, email: true } } } },
            },
        });
    }
    async updateProject(id, dto) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return this.prisma.project.update({
            where: { id },
            data: dto,
            include: {
                tasks: { include: { assignedUser: { select: { id: true, name: true, email: true } } } },
                users: { include: { user: { select: { id: true, name: true, email: true } } } },
            },
        });
    }
    async removeProject(id) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        await this.prisma.project.delete({ where: { id } });
        return { message: 'Project deleted' };
    }
    async createTask(projectId, dto) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (dto.assignedUserId) {
            const projectUser = await this.prisma.projectUser.findFirst({
                where: { projectId, userId: dto.assignedUserId },
            });
            if (!projectUser)
                throw new common_1.ConflictException('User is not a member of this project');
        }
        return this.prisma.task.create({
            data: {
                projectId,
                title: dto.title,
                area: dto.area,
                pricePerM2: dto.pricePerM2,
                startDate: dto.startDate,
                deadline: dto.deadline,
                done: dto.done || false,
                assignedUserId: dto.assignedUserId,
            },
            include: { assignedUser: { select: { id: true, name: true, email: true } } },
        });
    }
    async updateTask(projectId, taskId, dto) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Task not found');
        if (dto.assignedUserId) {
            const projectUser = await this.prisma.projectUser.findFirst({
                where: { projectId, userId: dto.assignedUserId },
            });
            if (!projectUser)
                throw new common_1.ConflictException('User is not a member of this project');
        }
        return this.prisma.task.update({
            where: { id: taskId },
            data: dto,
            include: { assignedUser: { select: { id: true, name: true, email: true } } },
        });
    }
    async removeTask(projectId, taskId) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Task not found');
        await this.prisma.task.delete({ where: { id: taskId } });
        return { message: 'Task deleted' };
    }
    async toggleTaskDone(projectId, taskId) {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Task not found');
        return this.prisma.task.update({
            where: { id: taskId },
            data: { done: !task.done },
            include: { assignedUser: { select: { id: true, name: true, email: true } } },
        });
    }
    async getProjectUsers(projectId) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return this.prisma.projectUser.findMany({
            where: { projectId },
            include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        });
    }
    async addProjectUser(projectId, dto) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const existing = await this.prisma.projectUser.findFirst({
            where: { projectId, userId: dto.userId },
        });
        if (existing)
            throw new common_1.ConflictException('User is already a member of this project');
        return this.prisma.projectUser.create({
            data: {
                projectId,
                userId: dto.userId,
                role: dto.role,
            },
            include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        });
    }
    async removeProjectUser(projectId, userId) {
        const projectUser = await this.prisma.projectUser.findFirst({
            where: { projectId, userId },
        });
        if (!projectUser)
            throw new common_1.NotFoundException('User is not a member of this project');
        await this.prisma.projectUser.delete({ where: { id: projectUser.id } });
        return { message: 'User removed from project' };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map