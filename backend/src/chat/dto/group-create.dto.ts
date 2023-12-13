import { groupType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroupCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(groupType)
  type: groupType;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsInt({ each: true })
  members: number[];
}
