import { Controller, Get, Post, Patch, Delete, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Business')
@ApiBearerAuth()
@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // === NALOG ===
  @Get('nalog')
  getNalogs(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllNalogs(req.user.id, month, year);
  }

  @Post('nalog')
  createNalog(@Request() req: any, @Body() dto: any) {
    return this.businessService.createNalog(req.user.id, dto);
  }

  // === ARENDA ===
  @Get('arenda')
  getArendas(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllArendas(req.user.id, month, year);
  }

  @Post('arenda')
  createArenda(@Request() req: any, @Body() dto: any) {
    return this.businessService.createArenda(req.user.id, dto);
  }

  // === INCOME ===
  @Get('income')
  getIncomes(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllIncomes(req.user.id, month, year);
  }

  @Post('income')
  createIncome(@Request() req: any, @Body() dto: any) {
    return this.businessService.createIncome(req.user.id, dto);
  }

  // === EXPENSE ===
  @Get('expenses')
  getExpenses(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllExpenses(req.user.id, month, year);
  }

  @Post('expenses')
  createExpense(@Request() req: any, @Body() dto: any) {
    return this.businessService.createExpense(req.user.id, dto);
  }

  // === UTILITIES ===
  @Get('utilities')
  getUtilities(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllUtilities(req.user.id, month, year);
  }

  @Post('utilities')
  createUtility(@Request() req: any, @Body() dto: any) {
    return this.businessService.createUtility(req.user.id, dto);
  }

  // === MATERIALS ===
  @Get('materials')
  getMaterials(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllMaterials(req.user.id, month, year);
  }

  @Post('materials')
  createMaterial(@Request() req: any, @Body() dto: any) {
    return this.businessService.createMaterial(req.user.id, dto);
  }

  // === AVANS ===
  @Get('avans')
  getAvans(@Request() req: any, @Query('month') month?: number, @Query('year') year?: number) {
    return this.businessService.getAllAvans(req.user.id, month, year);
  }

  @Post('avans')
  createAvans(@Request() req: any, @Body() dto: any) {
    return this.businessService.createAvans(req.user.id, dto);
  }

  @Patch('avans/:id')
  updateAvans(@Request() req: any, @Param('id') id: string, @Body() dto: any) {
    return this.businessService.updateAvans(id, req.user.id, dto);
  }

  // === DASHBOARD ===
  @Get('summary')
  getSummary(@Request() req: any, @Query('month') month: number, @Query('year') year: number) {
    return this.businessService.getDashboardSummary(req.user.id, month, year);
  }

  @Get('monthly-chart')
  getMonthlyChart(@Request() req: any, @Query('year') year: number) {
    return this.businessService.getMonthlyChart(req.user.id, year);
  }

  // === DELETE ===
  @Delete(':model/:id')
  deleteItem(@Request() req: any, @Param('model') model: string, @Param('id') id: string) {
    return this.businessService.deleteItem(model, id, req.user.id);
  }
}
