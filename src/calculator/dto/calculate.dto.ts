import { IsNumber, IsIn, IsOptional, Min } from 'class-validator';

export class CalculateDto {
  @IsNumber()
  @Min(0.01)
  width: number;

  @IsNumber()
  @Min(0.01)
  height: number;

  @IsIn([1, 2, 3])
  type: 1 | 2 | 3;

  @IsOptional()
  @IsNumber()
  @Min(0)
  glassPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  profilePrice?: number;
}
