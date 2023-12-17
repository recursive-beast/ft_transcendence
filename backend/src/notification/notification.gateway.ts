import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationType, Prisma } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { Server } from 'socket.io';
import { UserEntity } from 'src/common/entities/user.entity';
import { NotificationService } from './notification.service';
import { PrismaService } from 'nestjs-prisma';
import { GroupConversationEntity } from 'src/common/entities/group-conversation.entity';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private notificationService: NotificationService,
    private prismaService: PrismaService,
  ) {}

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

  @OnEvent('game.invite')
  async onGameInvite(userId: number, targetId: number, url: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const notification = await this.notificationService.create(
      NotificationType.GAME_INVITE,
      targetId,
      { user: instanceToPlain(user), url },
    );

    this.server
      .to(`user-${targetId}`)
      .emit('notification', instanceToPlain(notification));
  }

  @OnEvent('achivement.unlocked')
  async onAchievement(targetId: number, title: string) {
    const target = await this.prismaService.user.findUnique({
      where: { id: targetId },
    });

    if (!target) return;

    const notification = await this.notificationService.create(
      NotificationType.ACHIEVEMENT_UNLOCKED,
      targetId,
      { user: instanceToPlain(target), title },
    );

    this.server
      .to(`user-${targetId}`)
      .emit('notification', instanceToPlain(notification));
  }

  @OnEvent('chat.group.add')
  async onGroupAdd(
    user: UserEntity,
    target: UserEntity,
    group: GroupConversationEntity,
  ) {
    const notification = await this.notificationService.create(
      NotificationType.GROUP_ADD,
      target.id,
      {
        user: instanceToPlain(user),
        group: instanceToPlain(group),
      },
    );

    this.server
      .to(`user-${target.id}`)
      .emit('notification', instanceToPlain(notification));
  }
}
