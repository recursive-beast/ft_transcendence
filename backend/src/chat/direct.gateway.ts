import {
  ParseIntPipe,
  BadRequestException,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { instanceToPlain } from 'class-transformer';
import { Server, Socket } from 'socket.io';
import { HttpToWsFilter } from 'src/common/http-to-ws.filter';
import { PrismaIgnoreFilter } from 'src/common/prisma-ignore.filter';
import { DirectService } from './direct.service';
import { DirectMessageDTO } from './dto/direct-message.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
@UseFilters(PrismaIgnoreFilter)
@WebSocketGateway()
export class DirectGateway {
  constructor(private directconversationService: DirectService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('direct.message')
  async sendMessage(client: Socket, dto: DirectMessageDTO) {
    try {
      await this.directconversationService.checkBlock(
        client.data.id,
        dto.recieverId,
      );
      const message = await this.directconversationService.sendMessage(
        client.data.id,
        dto,
      );
      this.server
        .in(`user-${dto.recieverId}`)
        .emit('direct.message', instanceToPlain(message));
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @SubscribeMessage('join.conversation')
  async joinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) convId: number,
  ) {
    await this.directconversationService.seenMessage(client.data.id, convId);
  }
}
