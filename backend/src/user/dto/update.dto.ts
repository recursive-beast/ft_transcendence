import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().replace(/ +/g, ' ') || undefined)
  displayName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().replace(/ +/g, ' ') || undefined)
  fullName?: string;
}
