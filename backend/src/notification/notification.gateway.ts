import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationType, Prisma } from '@prisma/client';
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
  // @OnEvent('game.invite')
  // async onGameInvite(userId: number, targetId: number, url: string) {
  //   user: UserEntity = Prisma.u
  //   const notification = await this.notificationService.create(
  //     NotificationType.GAME_INVITE,
  //     target.id,
  //     { user: instanceToPlain(user), url },
  //   );

  //   this.server
  //     .to(`user-${target.id}`)
  //     .emit('notification', instanceToPlain(notification));
  // }
}
