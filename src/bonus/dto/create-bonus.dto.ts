import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBonusDto {
  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  date: string;
}
