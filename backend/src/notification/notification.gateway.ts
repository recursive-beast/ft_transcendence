import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationType } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { Server } from 'socket.io';
import { UserEntity } from 'src/common/entities/user.entity';
import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private notificationService: NotificationService) {}

  @OnEvent('user.friend.add')
  async onFriendAdd(user: UserEntity, target: UserEntity) {
    const notification = await this.notificationService.create(
      NotificationType.FRIEND_ADD,
      target.id,
      { user: instanceToPlain(user) },
    );

    this.server
      .to(`user-${target.id}`)
      .emit('notification', instanceToPlain(notification));
  }
}
