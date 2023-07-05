import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OTPDTO {
  @ApiProperty({example: '084632'})
  @IsNotEmpty()
  @IsString()
  otp: string;
}
