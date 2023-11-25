import {
  BadRequestException,
  NotFoundException,
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
import { GroupService } from './group.service';
import { GroupMessageDTO } from './dto/group-message.dto';
import { CatchAllFilter } from 'src/common/CatchAll.filter';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
@UseFilters(CatchAllFilter)
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
    this.groupconversationService.findMember(id, client.data.id);
    client.join(`channel-${id}`);
  }

  @SubscribeMessage('channel.leave')
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    client.leave(`channel-${id}`);
  }

  @SubscribeMessage('channel.ban')
  banFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    this.groupconversationService.banSomeone(
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

  @SubscribeMessage('channel.kick')
  kickFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    this.groupconversationService.kickSomeone(
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
  getMutedFromChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channelId: number; userId: number },
  ) {
    this.groupconversationService.muteSomeone(
      client.data.id,
      data.userId,
      data.channelId,
    );
    this.server.to(`user-${data.userId}`).emit('channel.muted', data.channelId);
  }
}
