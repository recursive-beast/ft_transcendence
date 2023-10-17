import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MessageEntity } from '../../common/entities/message.entity';
import { UserEntity } from 'src/common/entities/user.entity';

export class MessageDTO {
  @IsNotEmpty()
  @IsString()
  text: string;
}