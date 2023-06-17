import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuerySortOrder } from 'src/common/enum';

export class UserQueryCursorDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username?: string;
}

export class UserQueryOrderByDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  username?: QuerySortOrder;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  fullname?: QuerySortOrder;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  createdAt?: QuerySortOrder;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  updatedAt?: QuerySortOrder;
}

export class UserQueryDTO {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserQueryCursorDTO)
  cursor?: UserQueryCursorDTO;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Max(100)
  @Min(25)
  @Type(() => Number)
  take: number = 25;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserQueryOrderByDTO)
  orderBy?: UserQueryOrderByDTO;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  search?: string;
}
