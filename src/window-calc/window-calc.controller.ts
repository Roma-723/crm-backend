import { Controller, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WindowCalcService } from './window-calc.service';
import { CalculateWindowDto } from './dto/calculate-window.dto';
import { UpdatePricesDto } from './dto/update-prices.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Window Calculator')
@ApiBearerAuth()
@Controller('window-calc')
@UseGuards(JwtAuthGuard)
export class WindowCalcController {
  constructor(private readonly service: WindowCalcService) {}

  @Get('prices')
  @ApiOperation({ summary: 'Get current prices' })
  getPrices() {
    return this.service.getPrices();
  }

  @Put('prices')
  @ApiOperation({ summary: 'Update prices' })
  updatePrices(@Body() dto: UpdatePricesDto) {
    return this.service.updatePrices(dto);
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate window cost' })
  calculate(@Body() dto: CalculateWindowDto) {
    return this.service.calculate(dto);
  }
}
