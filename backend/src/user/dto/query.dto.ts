import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuerySortOrder } from 'src/common/enum';

export class UserQueryOrderByDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  displayName?: QuerySortOrder;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  fullName?: QuerySortOrder;

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
  @Type(() => UserQueryOrderByDTO)
  orderBy?: UserQueryOrderByDTO;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  search?: string;
}
