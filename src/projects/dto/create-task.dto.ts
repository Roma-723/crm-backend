import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  area: number;

  @IsNumber()
  pricePerM2: number;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  deadline?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsString()
  assignedUserId?: string;
}
