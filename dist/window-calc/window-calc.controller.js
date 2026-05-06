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
exports.WindowCalcController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const window_calc_service_1 = require("./window-calc.service");
const calculate_window_dto_1 = require("./dto/calculate-window.dto");
const update_prices_dto_1 = require("./dto/update-prices.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let WindowCalcController = class WindowCalcController {
    constructor(service) {
        this.service = service;
    }
    getPrices() {
        return this.service.getPrices();
    }
    updatePrices(dto) {
        return this.service.updatePrices(dto);
    }
    calculate(dto) {
        return this.service.calculate(dto);
    }
};
exports.WindowCalcController = WindowCalcController;
__decorate([
    (0, common_1.Get)('prices'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current prices' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowCalcController.prototype, "getPrices", null);
__decorate([
    (0, common_1.Put)('prices'),
    (0, swagger_1.ApiOperation)({ summary: 'Update prices' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_prices_dto_1.UpdatePricesDto]),
    __metadata("design:returntype", void 0)
], WindowCalcController.prototype, "updatePrices", null);
__decorate([
    (0, common_1.Post)('calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate window cost' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_window_dto_1.CalculateWindowDto]),
    __metadata("design:returntype", void 0)
], WindowCalcController.prototype, "calculate", null);
exports.WindowCalcController = WindowCalcController = __decorate([
    (0, swagger_1.ApiTags)('Window Calculator'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('window-calc'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [window_calc_service_1.WindowCalcService])
], WindowCalcController);
//# sourceMappingURL=window-calc.controller.js.map