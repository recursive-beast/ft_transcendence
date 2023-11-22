import { ArrayUnique, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GroupCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt({ each: true })
  members: number[];
}
