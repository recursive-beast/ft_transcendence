import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserUpdateDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => value.trim().replace(/ +/g, ' '))
  displayName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @Transform(({ value }) => value.trim().replace(/ +/g, ' '))
  fullName?: string;

  @IsOptional()
  @IsBoolean()
  firstTime?: boolean;
}
