import { ParseIntPipe, UseFilters } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserStatus } from 'src/common/enum';
import { HttpToWsFilter } from 'src/common/http-to-ws.filter';

@UseFilters(HttpToWsFilter)
@WebSocketGateway()
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('user.status')
  async onUserStatus(@MessageBody(ParseIntPipe) id: number) {
    const sockets = await this.server.in(`user-${id}`).fetchSockets();

    if (sockets.length > 0) {
      return { id, status: UserStatus.ONLINE };
    }
    return { id, status: UserStatus.OFFLINE };
  }

  async handleConnection(client: Socket) {
    const id = client.data.id;
    const room = `user-${id}`;

    await client.join(room);
    this.server.emit('user.status', { id, status: UserStatus.ONLINE });
  }

  async handleDisconnect(client: Socket) {
    const id = client.data.id;

    this.server.emit('user.status', { id, status: UserStatus.ONLINE });
  }
}
