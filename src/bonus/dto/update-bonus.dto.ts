import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBonusDto {
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
