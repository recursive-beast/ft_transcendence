import { ParseIntPipe, UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
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
  async onUserStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    const sockets = await this.server.in(`user-${id}`).fetchSockets();
    const status = sockets.length > 0 ? UserStatus.ONLINE : UserStatus.OFFLINE;

    client.emit('user.status', { id, status });
  }

  async handleConnection(client: Socket) {
    const id = client.data.id;
    const room = `user-${id}`;

    await client.join(room);
    this.server.emit('user.status', { id, status: UserStatus.ONLINE });
  }

  async handleDisconnect(client: Socket) {
    const id = client.data.id;
    const sockets = await this.server.in(`user-${id}`).fetchSockets();

    if (sockets.length === 0)
      this.server.emit('user.status', { id, status: UserStatus.OFFLINE });
  }
}
