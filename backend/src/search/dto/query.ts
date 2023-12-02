import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  search: string;
}
