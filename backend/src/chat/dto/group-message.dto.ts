import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GroupMessageDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  groupConversationId: number;
}
