import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePricesDto {
  @ApiProperty({ example: 4.5, description: 'L profile price per meter' })
  @IsNumber()
  @Min(0)
  lPrice: number;

  @ApiProperty({ example: 3.2, description: 'T profile price per meter' })
  @IsNumber()
  @Min(0)
  tPrice: number;

  @ApiProperty({ example: 5.1, description: 'Z profile price per meter' })
  @IsNumber()
  @Min(0)
  zPrice: number;

  @ApiProperty({ example: 12.0, description: 'Glass price per m²' })
  @IsNumber()
  @Min(0)
  glassPrice: number;

  @ApiProperty({ example: 2.8, description: 'Shtapik price per meter' })
  @IsNumber()
  @Min(0)
  shtapikPrice: number;
}
