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
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const business_service_1 = require("./business.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let BusinessController = class BusinessController {
    constructor(businessService) {
        this.businessService = businessService;
    }
    getNalogs(req, month, year) {
        return this.businessService.getAllNalogs(req.user.id, month, year);
    }
    createNalog(req, dto) {
        return this.businessService.createNalog(req.user.id, dto);
    }
    getArendas(req, month, year) {
        return this.businessService.getAllArendas(req.user.id, month, year);
    }
    createArenda(req, dto) {
        return this.businessService.createArenda(req.user.id, dto);
    }
    getIncomes(req, month, year) {
        return this.businessService.getAllIncomes(req.user.id, month, year);
    }
    createIncome(req, dto) {
        return this.businessService.createIncome(req.user.id, dto);
    }
    getExpenses(req, month, year) {
        return this.businessService.getAllExpenses(req.user.id, month, year);
    }
    createExpense(req, dto) {
        return this.businessService.createExpense(req.user.id, dto);
    }
    getUtilities(req, month, year) {
        return this.businessService.getAllUtilities(req.user.id, month, year);
    }
    createUtility(req, dto) {
        return this.businessService.createUtility(req.user.id, dto);
    }
    getMaterials(req, month, year) {
        return this.businessService.getAllMaterials(req.user.id, month, year);
    }
    createMaterial(req, dto) {
        return this.businessService.createMaterial(req.user.id, dto);
    }
    getAvans(req, month, year) {
        return this.businessService.getAllAvans(req.user.id, month, year);
    }
    createAvans(req, dto) {
        return this.businessService.createAvans(req.user.id, dto);
    }
    updateAvans(req, id, dto) {
        return this.businessService.updateAvans(id, req.user.id, dto);
    }
    getSummary(req, month, year) {
        return this.businessService.getDashboardSummary(req.user.id, month, year);
    }
    getMonthlyChart(req, year) {
        return this.businessService.getMonthlyChart(req.user.id, year);
    }
    deleteItem(req, model, id) {
        return this.businessService.deleteItem(model, id, req.user.id);
    }
};
exports.BusinessController = BusinessController;
__decorate([
    (0, common_1.Get)('nalog'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getNalogs", null);
__decorate([
    (0, common_1.Post)('nalog'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createNalog", null);
__decorate([
    (0, common_1.Get)('arenda'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getArendas", null);
__decorate([
    (0, common_1.Post)('arenda'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createArenda", null);
__decorate([
    (0, common_1.Get)('income'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getIncomes", null);
__decorate([
    (0, common_1.Post)('income'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createIncome", null);
__decorate([
    (0, common_1.Get)('expenses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Post)('expenses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('utilities'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getUtilities", null);
__decorate([
    (0, common_1.Post)('utilities'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createUtility", null);
__decorate([
    (0, common_1.Get)('materials'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getMaterials", null);
__decorate([
    (0, common_1.Post)('materials'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createMaterial", null);
__decorate([
    (0, common_1.Get)('avans'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getAvans", null);
__decorate([
    (0, common_1.Post)('avans'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createAvans", null);
__decorate([
    (0, common_1.Patch)('avans/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "updateAvans", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('monthly-chart'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "getMonthlyChart", null);
__decorate([
    (0, common_1.Delete)(':model/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('model')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "deleteItem", null);
exports.BusinessController = BusinessController = __decorate([
    (0, swagger_1.ApiTags)('Business'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('business'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessController);
//# sourceMappingURL=business.controller.js.map