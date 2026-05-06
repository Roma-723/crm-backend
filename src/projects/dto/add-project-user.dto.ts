import { IsString, IsOptional } from 'class-validator';

export class AddProjectUserDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  role?: string;
}
