import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';

@Injectable()
export class PenaltyService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.penalty.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.penalty.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  create(dto: CreatePenaltyDto) {
    return this.prisma.penalty.create({ data: dto });
  }

  async update(id: string, dto: UpdatePenaltyDto) {
    const item = await this.prisma.penalty.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Penalty not found');
    return this.prisma.penalty.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.prisma.penalty.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Penalty not found');
    await this.prisma.penalty.delete({ where: { id } });
    return { message: 'Penalty deleted' };
  }
}
