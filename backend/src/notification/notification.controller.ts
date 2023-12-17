import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async index(@CurrentUser() user: UserEntity) {
    return this.notificationService.findMany(user.id);
  }

  @Patch('seen')
  async seen(@CurrentUser() user: UserEntity) {
    return this.notificationService.markSeen(user.id);
  }

  @Put(':id/clicked')
  async clicked(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.notificationService.markAsClicked(user.id, id);
  }
}
