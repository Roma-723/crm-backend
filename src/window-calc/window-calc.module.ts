import { Module } from '@nestjs/common';
import { WindowCalcController } from './window-calc.controller';
import { WindowCalcService } from './window-calc.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WindowCalcController],
  providers: [WindowCalcService],
})
export class WindowCalcModule {}
