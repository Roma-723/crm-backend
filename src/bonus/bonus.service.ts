import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
@Injectable()
export class BonusService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.bonus.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.bonus.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  create(dto: CreateBonusDto) {
    return this.prisma.bonus.create({ data: dto });
  }

  async update(id: string, dto: UpdateBonusDto) {
    const item = await this.prisma.bonus.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Bonus not found');
    return this.prisma.bonus.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.prisma.bonus.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Bonus not found');
    await this.prisma.bonus.delete({ where: { id } });
    return { message: 'Bonus deleted' };
  }
}
