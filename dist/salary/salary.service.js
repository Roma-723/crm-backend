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
exports.SalaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const WORKING_DAYS_PER_MONTH = 26;
const WORKING_HOURS_PER_DAY = 8;
const LATE_HOUR_FINE = 10;
let SalaryService = class SalaryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    calcAbsenceDeduction(baseSalary, absentDays) {
        const dailyRate = baseSalary / WORKING_DAYS_PER_MONTH;
        return Math.round(dailyRate * absentDays);
    }
    calcLateDeduction(totalLateHours) {
        return Math.round(LATE_HOUR_FINE * totalLateHours);
    }
    async getSalaryByUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const [bonuses, penalties, absentRecords, lateRecords] = await Promise.all([
            this.prisma.bonus.findMany({ where: { userId } }),
            this.prisma.penalty.findMany({ where: { userId } }),
            this.prisma.attendance.findMany({
                where: { userId, status: 'absent', date: { startsWith: month } },
            }),
            this.prisma.attendance.findMany({
                where: { userId, status: 'present', date: { startsWith: month }, lateHours: { gt: 0 } },
            }),
        ]);
        const totalBonuses = bonuses.reduce((sum, b) => sum + b.amount, 0);
        const totalPenalties = penalties.reduce((sum, p) => sum + p.amount, 0);
        const absentDays = absentRecords.length;
        const totalLateHours = lateRecords.reduce((sum, r) => sum + (r.lateHours ?? 0), 0);
        const absenceDeduction = this.calcAbsenceDeduction(user.salary, absentDays);
        const lateDeduction = this.calcLateDeduction(totalLateHours);
        const finalSalary = user.salary + totalBonuses - totalPenalties - absenceDeduction - lateDeduction;
        return {
            userId,
            userName: user.name,
            baseSalary: user.salary,
            totalBonuses,
            totalPenalties,
            absentDays,
            absenceDeduction,
            totalLateHours,
            lateDeduction,
            finalSalary,
            bonuses,
            penalties,
        };
    }
    async getMonthlySalary(userId, month) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const [bonuses, penalties, absentRecords, lateRecords] = await Promise.all([
            this.prisma.bonus.findMany({ where: { userId, date: { startsWith: month } } }),
            this.prisma.penalty.findMany({ where: { userId, date: { startsWith: month } } }),
            this.prisma.attendance.findMany({
                where: { userId, status: 'absent', date: { startsWith: month } },
            }),
            this.prisma.attendance.findMany({
                where: { userId, status: 'present', date: { startsWith: month }, lateHours: { gt: 0 } },
            }),
        ]);
        const totalBonuses = bonuses.reduce((sum, b) => sum + b.amount, 0);
        const totalPenalties = penalties.reduce((sum, p) => sum + p.amount, 0);
        const absentDays = absentRecords.length;
        const totalLateHours = lateRecords.reduce((sum, r) => sum + (r.lateHours ?? 0), 0);
        const absenceDeduction = this.calcAbsenceDeduction(user.salary, absentDays);
        const lateDeduction = this.calcLateDeduction(totalLateHours);
        const finalSalary = user.salary + totalBonuses - totalPenalties - absenceDeduction - lateDeduction;
        return {
            userId,
            month,
            userName: user.name,
            baseSalary: user.salary,
            totalBonuses,
            totalPenalties,
            absentDays,
            absenceDeduction,
            totalLateHours,
            lateDeduction,
            finalSalary,
            bonuses,
            penalties,
        };
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalaryService);
//# sourceMappingURL=salary.service.js.map