import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { BonusModule } from './bonus/bonus.module';
import { PenaltyModule } from './penalty/penalty.module';
import { SalaryModule } from './salary/salary.module';
import { UploadModule } from './upload/upload.module';
import { BusinessModule } from './business/business.module';
import { CalculatorModule } from './calculator/calculator.module';
import { WindowCalcModule } from './window-calc/window-calc.module';
import { ProjectsModule } from './projects/projects.module';
import { PayrollModule } from './payroll/payroll.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    AttendanceModule,
    BonusModule,
    PenaltyModule,
    SalaryModule,
    UploadModule,
    BusinessModule,
    CalculatorModule,
    WindowCalcModule,
    ProjectsModule,
    PayrollModule,
  ],
})
export class AppModule {}
