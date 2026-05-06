import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePenaltyDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  date?: string;
}
