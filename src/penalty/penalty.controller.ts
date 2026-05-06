import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Penalty')
@ApiBearerAuth()
@Controller('penalty')
@UseGuards(JwtAuthGuard)
export class PenaltyController {
  constructor(private penaltyService: PenaltyService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.penaltyService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.id !== userId) return [];
    return this.penaltyService.findByUser(userId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreatePenaltyDto) {
    return this.penaltyService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdatePenaltyDto) {
    return this.penaltyService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.penaltyService.remove(id);
  }
}
