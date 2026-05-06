import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const WORKING_DAYS_PER_MONTH = 26;
const WORKING_HOURS_PER_DAY = 8;
const LATE_HOUR_FINE = 10;

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  private calcAbsenceDeduction(baseSalary: number, absentDays: number): number {
    const dailyRate = baseSalary / WORKING_DAYS_PER_MONTH;
    return Math.round(dailyRate * absentDays);
  }

  private calcLateDeduction(totalLateHours: number): number {
    return Math.round(LATE_HOUR_FINE * totalLateHours);
  }

  async getSalaryByUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

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

  async getMonthlySalary(userId: string, month: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

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
}
