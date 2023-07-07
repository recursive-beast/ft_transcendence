import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ example: 'andre' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  display_name?: string;

  @ApiProperty({ example: 'André Aubin' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @Exclude()
  image?: string;
}
