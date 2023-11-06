import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DirectMessageDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  recieverId: number;
}
