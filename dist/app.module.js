"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const attendance_module_1 = require("./attendance/attendance.module");
const bonus_module_1 = require("./bonus/bonus.module");
const penalty_module_1 = require("./penalty/penalty.module");
const salary_module_1 = require("./salary/salary.module");
const upload_module_1 = require("./upload/upload.module");
const business_module_1 = require("./business/business.module");
const calculator_module_1 = require("./calculator/calculator.module");
const window_calc_module_1 = require("./window-calc/window-calc.module");
const projects_module_1 = require("./projects/projects.module");
const payroll_module_1 = require("./payroll/payroll.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            attendance_module_1.AttendanceModule,
            bonus_module_1.BonusModule,
            penalty_module_1.PenaltyModule,
            salary_module_1.SalaryModule,
            upload_module_1.UploadModule,
            business_module_1.BusinessModule,
            calculator_module_1.CalculatorModule,
            window_calc_module_1.WindowCalcModule,
            projects_module_1.ProjectsModule,
            payroll_module_1.PayrollModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map