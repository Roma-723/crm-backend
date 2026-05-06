import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.attendance.findMany({
      include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
      orderBy: { date: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async create(dto: CreateAttendanceDto) {
    return this.prisma.attendance.create({ data: dto });
  }

  async bulkCreate(records: CreateAttendanceDto[]) {
    return this.prisma.$transaction(
      records.map((dto) => this.prisma.attendance.create({ data: dto })),
    );
  }

  async update(id: string, dto: UpdateAttendanceDto) {
    const item = await this.prisma.attendance.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Attendance record not found');
    return this.prisma.attendance.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.prisma.attendance.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Attendance record not found');
    await this.prisma.attendance.delete({ where: { id } });
    return { message: 'Attendance deleted' };
  }
}
