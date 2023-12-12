import { groupType } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroupUpdateDTO {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  type: groupType;

  @IsOptional()
  @IsString()
  newPassword?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;
}
