import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePayrollDto {
  @IsString()
  userId: string;

  @IsNumber()
  totalSalary: number;

  @IsNumber()
  paidAmount: number;

  @IsString()
  month: string;

  @IsOptional()
  @IsNumber()
  remainingAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
