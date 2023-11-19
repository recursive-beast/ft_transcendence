import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
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

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
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

    this.server
      .in(`channel-${dto.groupConversationId}`)
      .emit('channel.message', instanceToPlain(message));
  }

  @SubscribeMessage('channel.join')
  joinRoom(client: Socket, id: number) {
    client.join(`channel-${id}`);
  }
  
  @SubscribeMessage('channel.leave')
  leaveRoom(client: Socket, id: number) {
    client.leave(`channel-${id}`);
  }

  @SubscribeMessage('channel.ban')
  banFromChannel(client: Socket, @MessageBody() data: {channelId: number, userId: number}) {
    this.groupconversationService.banSomeone(client.data.id, data.userId, data.channelId);
    this.server.in(`channel-${data.channelId}`).socketsLeave(`user-${data.userId}`);
    this.server.to(`user-${data.userId}`).emit("channel.banned", data.channelId);
  }
  
  @SubscribeMessage('channel.kick')
  kickFromChannel(client: Socket, @MessageBody() data: {channelId: number, userId: number}) {
    this.groupconversationService.kickSomeone(client.data.id, data.userId, data.channelId);
    this.server.in(`channel-${data.channelId}`).socketsLeave(`user-${data.userId}`);
    this.server.to(`user-${data.userId}`).emit("channel.kicked", data.channelId);
  }
}
