import { IsNotEmpty, IsString } from 'class-validator';

export class OTPDTO {
  @IsNotEmpty()
  @IsString()
  otp: string;
}
