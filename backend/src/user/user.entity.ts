import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, plainToInstance } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiHideProperty()
  @Exclude()
  forty_two_id: string | null;

  @ApiHideProperty()
  @Exclude()
  google_id: string | null;

  @ApiProperty({ example: 'andre' })
  display_name: string;

  @ApiProperty({ example: 'André Aubin' })
  full_name: string;

  @ApiProperty({
    example: 'https://cdn.intra.42.fr/users/1234567890/andre.jpg',
  })
  image: string | null;

  @ApiHideProperty()
  @Exclude()
  otp_secret: string | null;

  otp_is_enabled: boolean;
  created_at: Date;
  updated_at: Date;

  static fromUser(user: User) {
    return plainToInstance(UserEntity, user, { ignoreDecorators: true });
  }
}
