import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePayrollDto {
  @IsOptional()
  @IsNumber()
  totalSalary?: number;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
