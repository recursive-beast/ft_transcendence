import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  ArrayMinSize,
  IsString,
} from 'class-validator';
import { ConversationEntity } from '../../common/entities/conversation.entity';
import { UserEntity } from 'src/common/entities/user.entity';

export class ConversationDTO {
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isGroup = false;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(2)
  members: number[];
}
