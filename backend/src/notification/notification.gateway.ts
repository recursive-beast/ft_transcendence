import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationType } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { Server } from 'socket.io';
import { BaseGateway } from 'src/common/base.gateway';
import { UserEntity } from 'src/common/entities/user.entity';
import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationGateway extends BaseGateway {
  @WebSocketServer()
  server: Server;

  constructor(private notificationService: NotificationService) {
    super();
  }

  @OnEvent('user.friend.add')
  async onFriendAdd(user: UserEntity, target: UserEntity) {
    const notification = await this.notificationService.create(
      NotificationType.FRIEND_ADD,
      target.id,
      { user: { id: user.id } },
    );

    if (this.isOnline(target.id))
      this.server
        .to(this.socketIds(target.id))
        .emit('notification', instanceToPlain(notification));
  }
}
