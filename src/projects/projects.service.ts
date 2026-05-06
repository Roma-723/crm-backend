import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddProjectUserDto } from './dto/add-project-user.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Projects
  findAllProjects() {
    return this.prisma.project.findMany({
      include: {
        tasks: { orderBy: { createdAt: 'desc' } },
        users: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: { include: { assignedUser: { select: { id: true, name: true, email: true, avatar: true } } }, orderBy: { createdAt: 'desc' } },
        users: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  createProject(dto: CreateProjectDto) {
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

  async updateProject(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: {
        tasks: { include: { assignedUser: { select: { id: true, name: true, email: true } } } },
        users: { include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
  }

  async removeProject(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    await this.prisma.project.delete({ where: { id } });
    return { message: 'Project deleted' };
  }

  // Tasks
  async createTask(projectId: string, dto: CreateTaskDto) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    if (dto.assignedUserId) {
      const projectUser = await this.prisma.projectUser.findFirst({
        where: { projectId, userId: dto.assignedUserId },
      });
      if (!projectUser) throw new ConflictException('User is not a member of this project');
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

  async updateTask(projectId: string, taskId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.projectId !== projectId) throw new NotFoundException('Task not found');

    if (dto.assignedUserId) {
      const projectUser = await this.prisma.projectUser.findFirst({
        where: { projectId, userId: dto.assignedUserId },
      });
      if (!projectUser) throw new ConflictException('User is not a member of this project');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: dto,
      include: { assignedUser: { select: { id: true, name: true, email: true } } },
    });
  }

  async removeTask(projectId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.projectId !== projectId) throw new NotFoundException('Task not found');
    await this.prisma.task.delete({ where: { id: taskId } });
    return { message: 'Task deleted' };
  }

  async toggleTaskDone(projectId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.projectId !== projectId) throw new NotFoundException('Task not found');
    return this.prisma.task.update({
      where: { id: taskId },
      data: { done: !task.done },
      include: { assignedUser: { select: { id: true, name: true, email: true } } },
    });
  }

  // Project Users
  async getProjectUsers(projectId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    return this.prisma.projectUser.findMany({
      where: { projectId },
      include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
    });
  }

  async addProjectUser(projectId: string, dto: AddProjectUserDto) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.prisma.projectUser.findFirst({
      where: { projectId, userId: dto.userId },
    });
    if (existing) throw new ConflictException('User is already a member of this project');

    return this.prisma.projectUser.create({
      data: {
        projectId,
        userId: dto.userId,
        role: dto.role,
      },
      include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
    });
  }

  async removeProjectUser(projectId: string, userId: string) {
    const projectUser = await this.prisma.projectUser.findFirst({
      where: { projectId, userId },
    });
    if (!projectUser) throw new NotFoundException('User is not a member of this project');

    await this.prisma.projectUser.delete({ where: { id: projectUser.id } });
    return { message: 'User removed from project' };
  }
}
