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
import { groupType } from '@prisma/client';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
@UseFilters(PrismaIgnoreFilter)
@WebSocketGateway()
export class GroupGateway {
  constructor(private groupconversationService: GroupService) {}

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
        .in(`channel-${dto.groupConversationId}`)
        .emit('channel.message', instanceToPlain(message));
  }

  @SubscribeMessage('channel.join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    // this.groupconversationService.findMember(id, client.data.id);
    client.join(`channel-${id}`);
  }

  @SubscribeMessage('channel.leave')
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    // this.groupconversationService.leaveChannel(client.data.id, id)
    client.leave(`channel-${id}`);
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
      .in(`channel-${data.channelId}`)
      .socketsLeave(`user-${data.userId}`);
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.banned', data.channelId);
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
      .in(`channel-${data.channelId}`)
      .socketsLeave(`user-${data.userId}`);
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
        .to(`user-${data.members[index]}`)
        .emit('channel.added', data.channelId);
    }
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
      .in(`channel-${data.channelId}`)
      .socketsLeave(`user-${data.userId}`);
    this.server
      .to(`user-${data.userId}`)
      .emit('channel.kicked', data.channelId);
  }

  @SubscribeMessage('channel.mute')
  async getMutedFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    await this.groupconversationService.muteSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server.to(`user-${data.userId}`).emit('channel.muted', data.channelId);
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
    @MessageBody() channelTitle: string
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
}
