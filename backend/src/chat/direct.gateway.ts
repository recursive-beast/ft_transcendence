import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { instanceToPlain } from 'class-transformer';
import { Server, Socket } from 'socket.io';
import { HttpToWsFilter } from 'src/common/http-to-ws.filter';
import { DirectService } from './direct.service';
import { DirectMessageDTO } from './dto/direct-message.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(HttpToWsFilter)
@WebSocketGateway()
export class DirectGateway {
  constructor(private directconversationService: DirectService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('direct.message')
  async sendMessage(client: Socket, dto: DirectMessageDTO) {
    const message = await this.directconversationService.sendMessage(
      client.data.id,
      dto,
    );

    this.server
      .in(`user-${dto.recieverId}`)
      .emit('direct.message', instanceToPlain(message));
  }
}
