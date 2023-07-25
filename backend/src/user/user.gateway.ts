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
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { BaseGateway } from 'src/common/base.gateway';
import { UserStatus } from 'src/common/enum';
import { HttpToWsFilter } from 'src/common/http-to-ws.filter';

@UseFilters(HttpToWsFilter)
@WebSocketGateway()
export class UserGateway
  extends BaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private status: Partial<Record<User['id'], UserStatus>> = {};

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('user.status')
  onUserStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody(ParseIntPipe) id: number,
  ) {
    return this.emitStatus(client, id);
  }

  handleConnection(client: Socket) {
    super.handleConnection(client);

    const userId = client.data.id;

    // only set/broadcast status on first connected socket.
    if (this.socketCount(userId) === 1) {
      this.setStatus(userId, UserStatus.ONLINE);
      this.broadcastStatus(userId);
    }
  }

  handleDisconnect(client: Socket) {
    super.handleDisconnect(client);

    const userId = client.data.id;

    if (this.isOffline(userId)) {
      delete this.status[userId];
      this.broadcastStatus(userId);
    }
  }

  broadcastStatus(id: User['id'], status?: UserStatus) {
    if (!status) status = this.getStatus(id);

    this.server.except(this.socketIds(id)).emit('user.status', { id, status });

    return { id, status };
  }

  emitStatus(client: Socket, id: User['id'], status?: UserStatus) {
    if (!status) status = this.getStatus(id);

    client.emit('user.status', { id, status });

    return { id, status };
  }

  getStatus(id: User['id']) {
    return this.status[id] || UserStatus.OFFLINE;
  }

  setStatus(id: User['id'], status: Exclude<UserStatus, UserStatus.OFFLINE>) {
    if (this.isOnline(id)) {
      this.status[id] = status;
      return status;
    }

    return UserStatus.OFFLINE;
  }
}
