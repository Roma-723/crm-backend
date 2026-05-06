import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddProjectUserDto } from './dto/add-project-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // Projects
  @Get()
  @Roles('admin')
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  @Roles('admin')
  findOneProject(@Param('id') id: string) {
    return this.projectsService.findOneProject(id);
  }

  @Post()
  @Roles('admin')
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @Patch(':id')
  @Roles('admin')
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  removeProject(@Param('id') id: string) {
    return this.projectsService.removeProject(id);
  }

  // Tasks
  @Post(':projectId/tasks')
  @Roles('admin')
  createTask(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return this.projectsService.createTask(projectId, dto);
  }

  @Patch(':projectId/tasks/:taskId')
  @Roles('admin')
  updateTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.projectsService.updateTask(projectId, taskId, dto);
  }

  @Patch(':projectId/tasks/:taskId/toggle')
  @Roles('admin')
  toggleTaskDone(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.projectsService.toggleTaskDone(projectId, taskId);
  }

  @Delete(':projectId/tasks/:taskId')
  @Roles('admin')
  removeTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.projectsService.removeTask(projectId, taskId);
  }

  // Project Users
  @Get(':projectId/users')
  @Roles('admin')
  getProjectUsers(@Param('projectId') projectId: string) {
    return this.projectsService.getProjectUsers(projectId);
  }

  @Post(':projectId/users')
  @Roles('admin')
  addProjectUser(
    @Param('projectId') projectId: string,
    @Body() dto: AddProjectUserDto,
  ) {
    return this.projectsService.addProjectUser(projectId, dto);
  }

  @Delete(':projectId/users/:userId')
  @Roles('admin')
  removeProjectUser(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    return this.projectsService.removeProjectUser(projectId, userId);
  }
}
