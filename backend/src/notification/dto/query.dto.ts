import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuerySortOrder } from 'src/common/enum';

export class NotificationQueryCursorDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id?: number;
}

export class NotificationQueryOrderByDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  createdAt: QuerySortOrder = QuerySortOrder.DESC;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(QuerySortOrder)
  updatedAt?: QuerySortOrder;
}

export class NotificationQueryDTO {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NotificationQueryCursorDTO)
  cursor?: NotificationQueryCursorDTO;

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
  skip: number = 0;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NotificationQueryOrderByDTO)
  orderBy?: NotificationQueryOrderByDTO;
}
