import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Payroll')
@ApiBearerAuth()
@Controller('payroll')
@UseGuards(JwtAuthGuard)
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.payrollService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.id !== userId) return [];
    return this.payrollService.findByUser(userId);
  }

  @Post('generate/:month')
  @UseGuards(RolesGuard)
  @Roles('admin')
  generatePayroll(@Param('month') month: string) {
    return this.payrollService.generatePayrollForMonth(month);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreatePayrollDto) {
    return this.payrollService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdatePayrollDto) {
    return this.payrollService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
}
