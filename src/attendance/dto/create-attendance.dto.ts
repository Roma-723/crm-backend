import { IsString, IsOptional, IsIn, IsNumber, Min } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  userId: string;

  @IsString()
  date: string;

  @IsIn(['present', 'absent'])
  status: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  lateHours?: number;
}
