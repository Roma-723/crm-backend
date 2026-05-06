import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SalaryService } from './salary.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Salary')
@ApiBearerAuth()
@Controller('salary')
@UseGuards(JwtAuthGuard)
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  @Get('user/:userId')
  getSalaryByUser(@Param('userId') userId: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return { error: 'Forbidden' };
    }
    return this.salaryService.getSalaryByUser(userId);
  }

  @Get('month/:userId/:month')
  getMonthlySalary(
    @Param('userId') userId: string,
    @Param('month') month: string,
    @Request() req,
  ) {
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return { error: 'Forbidden' };
    }
    return this.salaryService.getMonthlySalary(userId, month);
  }
}
