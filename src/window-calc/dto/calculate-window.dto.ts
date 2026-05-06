import { IsNumber, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateWindowDto {
  @ApiProperty({ example: 1200, description: 'Width in mm' })
  @IsNumber()
  @Min(1)
  width: number;

  @ApiProperty({ example: 1400, description: 'Height in mm' })
  @IsNumber()
  @Min(1)
  height: number;

  @ApiProperty({ example: 2, description: 'Number of sashes (min 1)' })
  @IsInt()
  @Min(1)
  sashCount: number;
}
