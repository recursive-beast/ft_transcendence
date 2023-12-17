import {
  ParseIntPipe,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { instanceToPlain } from 'class-transformer';
import { Server, Socket } from 'socket.io';
import { HttpToWsFilter } from 'src/common/http-to-ws.filter';
import { PrismaIgnoreFilter } from 'src/common/prisma-ignore.filter';
import { GroupMessageDTO } from './dto/group-message.dto';
import { GroupService } from './group.service';
import { GroupUpdateDTO } from './dto/group-update.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'nestjs-prisma';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
@UseFilters(PrismaIgnoreFilter)
@WebSocketGateway()
export class GroupGateway {
  constructor(
    private groupconversationService: GroupService,
    private eventEmitter: EventEmitter2,
    private prismaService: PrismaService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('channel.message')
  async sendMessage(client: Socket, dto: GroupMessageDTO) {
    const message = await this.groupconversationService.sendMessage(
      client.data.id,
      dto,
    );
    if (message)
      this.server
        .to(`channel-${dto.groupConversationId}`)
        .emit('channel.message', instanceToPlain(message));
  }

  @SubscribeMessage('room.join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    //TODO: PROTECT IT
    client.join(`channel-${id}`);
  }

  @OnEvent('channel.join')
  onJoin(groupId: number) {
    this.server.to(`channel-${groupId}`).emit('channel.join');
  }

  @SubscribeMessage('channel.join')
  async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { channelId: number; channelTitle: string; password?: string },
  ) {
    await this.groupconversationService.joinChannel(
      client.data.id,
      data.channelTitle,
      data.password,
    );
    client.join(`channel-${data.channelId}`);
  }

  @SubscribeMessage('channel.leave')
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    await this.groupconversationService.leaveChannel(client.data.id, id);
    this.server.to(`user-${client.data.id}`).emit('channel.exit', id);
    client.leave(`channel-${id}`);
    this.server.to(`channel-${id}`).emit('channel.updated');
  }

  @SubscribeMessage('channel.ban')
  async banFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.banSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .in(`user-${data.userId}`)
      .socketsLeave(`channel-${data.channelId}`);
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.banned', data.channelId);
    this.server.to(`channel-${data.channelId}`).emit('channel.updated');
  }

  @SubscribeMessage('channel.unban')
  async unbanFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.unbanSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .in(`user-${data.userId}`)
      .socketsLeave(`channel-${data.channelId}`);
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.unbanned', data.channelId);
  }

  @SubscribeMessage('channel.add')
  async addMembersChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; members: number[] },
  ) {
    await this.groupconversationService.addNewMembers(
      client.data.id,
      data.channelId,
      data.members,
    );
    for (let index = 0; index < data.members.length; index++) {
      this.server
        .to(`channel-${data.channelId}`)
        .emit('channel.added', data.channelId);
    }

    const source = await this.prismaService.user.findFirstOrThrow({
      where: { id: client.data.id },
    });

    const target = await this.prismaService.user.findFirstOrThrow({
      where: { id: data.members[0] },
    });

    const group = await this.prismaService.groupConversation.findFirstOrThrow({
      where: { id: data.channelId },
    });

    this.eventEmitter.emit('chat.group.add', source, target, group);
  }

  @SubscribeMessage('channel.kick')
  async kickFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.kickSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .in(`user-${data.userId}`)
      .socketsLeave(`channel-${data.channelId}`);
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.kicked', data.channelId);

    this.server.to(`channel-${data.channelId}`).emit('channel.updated');
  }

  @SubscribeMessage('channel.mute')
  async getMutedFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    const member = await this.groupconversationService.muteSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );

    const ms = member.mutedUntil.getTime() - Date.now() + 5000;

    setTimeout(async () => {
      await this.groupconversationService.unmuteSomeone(
        client.data.id,
        data.userId,
        data.channelId,
      );

      this.server
        .to(`channel-${data.channelId}`)
        .emit('channel.unmuted', data.channelId);
    }, ms);

    this.server
      .to(`channel-${data.channelId}`)
      .emit('channel.muted', data.channelId);
  }

  @SubscribeMessage('channel.unmute')
  async getUnmutedFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.unmuteSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .to(`channel-${data.channelId}`)
      .emit('channel.unmuted', data.channelId);
  }

  @SubscribeMessage('channel.upgrade')
  async upgradeUserRole(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.upgradeMember(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.upgraded', data.channelId);
  }

  @SubscribeMessage('channel.downgrade')
  async downgradeUserRole(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.downgradeMember(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.downgraded', data.channelId);
  }

  @SubscribeMessage('channel.search')
  async getChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() channelTitle: string,
  ) {
    try {
      const res = await this.groupconversationService.searchforChannel(
        channelTitle,
      );
      this.server.to(`user-${client.data.id}`).emit('channel.found', res);
    } catch {
      this.server.to(`user-${client.data.id}`).emit('channel.found', null);
    }
  }

  @SubscribeMessage('channel.title')
  async changeTitle(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; newTitle: string },
  ) {
    await this.groupconversationService.updateChannelTitle(
      client.data.id,
      data.channelId,
      data.newTitle,
    );

    this.server.to(`channel-${data.channelId}`).emit('channel.updated');
  }

  @SubscribeMessage('channel.type')
  async changeType(client: Socket, dto: GroupUpdateDTO) {
    await this.groupconversationService.updateChannelType(client.data.id, dto);

    this.server.to(`channel-${dto.id}`).emit('channel.updated');
  }
}
