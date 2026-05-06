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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const add_project_user_dto_1 = require("./dto/add-project-user.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    findAllProjects() {
        return this.projectsService.findAllProjects();
    }
    findOneProject(id) {
        return this.projectsService.findOneProject(id);
    }
    createProject(dto) {
        return this.projectsService.createProject(dto);
    }
    updateProject(id, dto) {
        return this.projectsService.updateProject(id, dto);
    }
    removeProject(id) {
        return this.projectsService.removeProject(id);
    }
    createTask(projectId, dto) {
        return this.projectsService.createTask(projectId, dto);
    }
    updateTask(projectId, taskId, dto) {
        return this.projectsService.updateTask(projectId, taskId, dto);
    }
    toggleTaskDone(projectId, taskId) {
        return this.projectsService.toggleTaskDone(projectId, taskId);
    }
    removeTask(projectId, taskId) {
        return this.projectsService.removeTask(projectId, taskId);
    }
    getProjectUsers(projectId) {
        return this.projectsService.getProjectUsers(projectId);
    }
    addProjectUser(projectId, dto) {
        return this.projectsService.addProjectUser(projectId, dto);
    }
    removeProjectUser(projectId, userId) {
        return this.projectsService.removeProjectUser(projectId, userId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAllProjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOneProject", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeProject", null);
__decorate([
    (0, common_1.Post)(':projectId/tasks'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)(':projectId/tasks/:taskId'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Patch)(':projectId/tasks/:taskId/toggle'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "toggleTaskDone", null);
__decorate([
    (0, common_1.Delete)(':projectId/tasks/:taskId'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeTask", null);
__decorate([
    (0, common_1.Get)(':projectId/users'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjectUsers", null);
__decorate([
    (0, common_1.Post)(':projectId/users'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_project_user_dto_1.AddProjectUserDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addProjectUser", null);
__decorate([
    (0, common_1.Delete)(':projectId/users/:userId'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeProjectUser", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map