import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.payrollRecord.findMany({
      include: { user: { select: { id: true, name: true, email: true, salary: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.payrollRecord.findMany({
      where: { userId },
      include: { user: { select: { id: true, name: true, email: true, salary: true } } },
      orderBy: { month: 'desc' },
    });
  }

  create(dto: CreatePayrollDto) {
    const remainingAmount = Math.max(0, dto.totalSalary - dto.paidAmount);
    return this.prisma.payrollRecord.create({
      data: {
        ...dto,
        remainingAmount,
      },
      include: { user: { select: { id: true, name: true, email: true, salary: true } } },
    });
  }

  async update(id: string, dto: UpdatePayrollDto) {
    const item = await this.prisma.payrollRecord.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('PayrollRecord not found');

    const totalSalary = dto.totalSalary ?? item.totalSalary;
    const paidAmount = dto.paidAmount ?? item.paidAmount;
    const remainingAmount = Math.max(0, totalSalary - paidAmount);

    return this.prisma.payrollRecord.update({
      where: { id },
      data: {
        ...dto,
        remainingAmount,
      },
      include: { user: { select: { id: true, name: true, email: true, salary: true } } },
    });
  }

  async remove(id: string) {
    const item = await this.prisma.payrollRecord.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('PayrollRecord not found');
    await this.prisma.payrollRecord.delete({ where: { id } });
    return { message: 'PayrollRecord deleted' };
  }

  async generatePayrollForMonth(month: string) {
    const users = await this.prisma.user.findMany({
      where: { salary: { gt: 0 } },
    });

    const createdRecords = [];
    for (const user of users) {
      const existing = await this.prisma.payrollRecord.findFirst({
        where: {
          userId: user.id,
          month,
        },
      });

      if (!existing) {
        const record = await this.prisma.payrollRecord.create({
          data: {
            userId: user.id,
            totalSalary: user.salary,
            paidAmount: 0,
            month,
            remainingAmount: user.salary,
          },
          include: { user: { select: { id: true, name: true, email: true, salary: true } } },
        });
        createdRecords.push(record);
      }
    }

    return createdRecords;
  }
}
