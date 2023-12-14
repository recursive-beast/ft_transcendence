import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  search: string;
}
