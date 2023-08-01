import { Expose } from 'class-transformer';
import { UserEntity } from '../../common/entities/user.entity';

export class UserDTO extends UserEntity {
  @Expose()
  isFriend: boolean;

  @Expose()
  isBlocked: boolean;
}
