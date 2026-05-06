import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/calculate.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Calculator')
@ApiBearerAuth()
@Controller('calculator')
@UseGuards(JwtAuthGuard)
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateDto) {
    return this.calculatorService.calculate(dto);
  }
}
