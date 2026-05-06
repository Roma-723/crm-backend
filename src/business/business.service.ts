import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  // === NALOG ===
  async getAllNalogs(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      where.date = { gte: startDate, lte: endDate };
    }
    const data = await this.prisma.nalog.findMany({ where, orderBy: { date: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    return { data, total: data.length, totalAmount };
  }

  async createNalog(userId: string, dto: any) {
    return this.prisma.nalog.create({
      data: { ...dto, userId, date: new Date(dto.date) },
    });
  }

  // === ARENDA ===
  async getAllArendas(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month) where.month = Number(month);
    if (year) where.year = Number(year);
    const data = await this.prisma.arenda.findMany({ where, orderBy: { createdAt: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    return { data, total: data.length, totalAmount };
  }

  async createArenda(userId: string, dto: any) {
    return this.prisma.arenda.create({
      data: { ...dto, userId, month: Number(dto.month), year: Number(dto.year) },
    });
  }

  // === INCOME ===
  async getAllIncomes(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0, 23, 59, 59),
      };
    }
    const data = await this.prisma.income.findMany({ where, orderBy: { date: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Group by category for chart
    const byCategory = await this.prisma.income.groupBy({
      by: ['category'],
      where,
      _sum: { amount: true },
    });

    return { data, total: data.length, totalAmount, byCategory };
  }

  async createIncome(userId: string, dto: any) {
    return this.prisma.income.create({
      data: { ...dto, userId, date: new Date(dto.date) },
    });
  }

  // === EXPENSE ===
  async getAllExpenses(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0, 23, 59, 59),
      };
    }
    const data = await this.prisma.expense.findMany({ where, orderBy: { date: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    
    const byCategory = await this.prisma.expense.groupBy({
      by: ['category'],
      where,
      _sum: { amount: true },
    });

    return { data, total: data.length, totalAmount, byCategory };
  }

  async createExpense(userId: string, dto: any) {
    return this.prisma.expense.create({
      data: { ...dto, userId, date: new Date(dto.date) },
    });
  }

  // === UTILITIES ===
  async getAllUtilities(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month) where.month = Number(month);
    if (year) where.year = Number(year);
    const data = await this.prisma.utility.findMany({ where, orderBy: { createdAt: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    
    const byType = await this.prisma.utility.groupBy({
      by: ['type'],
      where,
      _sum: { amount: true },
    });

    return { data, total: data.length, totalAmount, byType };
  }

  async createUtility(userId: string, dto: any) {
    return this.prisma.utility.create({
      data: { ...dto, userId, month: Number(dto.month), year: Number(dto.year) },
    });
  }

  // === MATERIALS ===
  async getAllMaterials(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0, 23, 59, 59),
      };
    }
    const data = await this.prisma.material.findMany({ where, orderBy: { date: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return { data, total: data.length, totalAmount };
  }

  async createMaterial(userId: string, dto: any) {
    return this.prisma.material.create({
      data: { ...dto, userId, quantity: Number(dto.quantity), price: Number(dto.price), date: new Date(dto.date) },
    });
  }

  // === AVANS ===
  async getAllAvans(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month && year) {
      where.date = {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0, 23, 59, 59),
      };
    }
    const data = await this.prisma.avans.findMany({ where, orderBy: { date: 'desc' } });
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    return { data, total: data.length, totalAmount };
  }

  async createAvans(userId: string, dto: any) {
    const avans = await this.prisma.avans.create({
      data: { ...dto, userId, date: new Date(dto.date) },
    });
    if (dto.employeeId) {
      await this.prisma.user.update({
        where: { id: dto.employeeId },
        data: { salary: { decrement: dto.amount } },
      });
    }
    return avans;
  }

  // === DASHBOARD SUMMARY ===
  async getDashboardSummary(userId: string, month: number, year: number) {
    const m = Number(month);
    const y = Number(year);
    const dateWhere = {
      gte: new Date(y, m - 1, 1),
      lte: new Date(y, m, 0, 23, 59, 59),
    };

    const [income, expense, utility, nalog, arenda, avans, materials, salaryTotal] = await Promise.all([
      this.prisma.income.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
      this.prisma.expense.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
      this.prisma.utility.aggregate({ where: { userId, month: m, year: y }, _sum: { amount: true } }),
      this.prisma.nalog.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
      this.prisma.arenda.aggregate({ where: { userId, month: m, year: y }, _sum: { amount: true } }),
      this.prisma.avans.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
      this.prisma.material.aggregate({ where: { userId, date: dateWhere }, _sum: { price: true } }),
      this.prisma.user.aggregate({ _sum: { salary: true } }),
    ]);

    const materialsTotal = materials._sum.price || 0;
    const salarySum = salaryTotal._sum.salary || 0;
    const totalIncome = income._sum.amount || 0;
    const totalExpenses =
      (expense._sum.amount || 0) +
      (utility._sum.amount || 0) +
      (nalog._sum.amount || 0) +
      (arenda._sum.amount || 0) +
      (avans._sum.amount || 0) +
      materialsTotal +
      salarySum;

    return {
      income: { total: totalIncome },
      expenses: {
        total: totalExpenses,
        salary: salarySum,
        nalog: nalog._sum.amount || 0,
        arenda: arenda._sum.amount || 0,
        avans: avans._sum.amount || 0,
        materials: materialsTotal,
        utilities: utility._sum.amount || 0,
        other: expense._sum.amount || 0,
      },
      utilities: {
        total: utility._sum.amount || 0,
      },
      netProfit: totalIncome - totalExpenses,
    };
  }

  async getMonthlyChart(userId: string, year: number) {
    const y = Number(year);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const results = await Promise.all(
      months.map(async (m) => {
        const dateWhere = {
          gte: new Date(y, m - 1, 1),
          lte: new Date(y, m, 0, 23, 59, 59),
        };
        const [inc, exp] = await Promise.all([
          this.prisma.income.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
          this.prisma.expense.aggregate({ where: { userId, date: dateWhere }, _sum: { amount: true } }),
        ]);
        const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        return {
          name: monthNames[m - 1],
          income: inc._sum.amount || 0,
          expense: exp._sum.amount || 0,
        };
      })
    );
    return results;
  }

  async updateAvans(id: string, userId: string, dto: any) {
    const existing = await this.prisma.avans.findFirst({ where: { id, userId } });
    if (!existing) throw new Error('Not found');

    const diff = dto.amount - existing.amount;
    await this.prisma.avans.update({
      where: { id },
      data: {
        person: dto.person ?? existing.person,
        amount: dto.amount ?? existing.amount,
        date: dto.date ? new Date(dto.date) : existing.date,
        purpose: dto.purpose ?? existing.purpose,
        status: dto.status ?? existing.status,
      },
    });

    if (existing.employeeId && diff !== 0) {
      await this.prisma.user.update({
        where: { id: existing.employeeId },
        data: { salary: { decrement: diff } },
      });
    }
    return this.prisma.avans.findUnique({ where: { id } });
  }

  // Generic Delete — avans uchun oylikni qaytaradi
  async deleteItem(model: string, id: string, userId: string) {
    if (model === 'avans') {
      const record = await this.prisma.avans.findFirst({ where: { id, userId } });
      if (record?.employeeId) {
        await this.prisma.user.update({
          where: { id: record.employeeId },
          data: { salary: { increment: record.amount } },
        });
      }
    }
    return this.prisma[model].deleteMany({ where: { id, userId } });
  }
}
