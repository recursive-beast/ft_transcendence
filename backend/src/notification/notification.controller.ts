import { Controller, Get, Patch, Query } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { NotificationQueryDTO } from './dto/query.dto';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async index(
    @Query() query: NotificationQueryDTO,
    @CurrentUser() user: UserEntity,
  ) {
    const { data, meta } = await this.notificationService.findMany(
      user.id,
      query,
    );
    const unseen = await this.notificationService.countUnseen(user.id);

    return {
      meta: { ...meta, unseen },
      data,
    };
  }

  @Patch('seen')
  async seen(@CurrentUser() user: UserEntity) {
    return { data: await this.notificationService.markSeen(user.id) };
  }
}
