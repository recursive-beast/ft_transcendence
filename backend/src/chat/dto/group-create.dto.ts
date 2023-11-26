import { groupType } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroupCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  type: groupType;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsInt({ each: true })
  members: number[];
}
