import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { QuerySortOrder } from 'src/common/enum';

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
  @Type(() => NotificationQueryOrderByDTO)
  orderBy?: NotificationQueryOrderByDTO;
}
