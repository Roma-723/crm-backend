import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Bonus')
@ApiBearerAuth()
@Controller('bonus')
@UseGuards(JwtAuthGuard)
export class BonusController {
  constructor(private bonusService: BonusService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.bonusService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.id !== userId) return [];
    return this.bonusService.findByUser(userId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateBonusDto) {
    return this.bonusService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateBonusDto) {
    return this.bonusService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.bonusService.remove(id);
  }
}
