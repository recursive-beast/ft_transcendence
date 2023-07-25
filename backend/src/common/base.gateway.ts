import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private _socketIds: Partial<Record<User['id'], Set<string>>> = {};

  handleConnection(client: Socket) {
    const userId = client.data.id;
    const set = this._socketIds[userId] || new Set();

    set.add(client.id);
    this._socketIds[userId] = set;
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.id;
    const set = this._socketIds[userId];

    if (!set) return;

    set.delete(client.id);

    if (set.size < 1) delete this._socketIds[userId];
  }

  socketIds(id: User['id']) {
    return Array.from(this._socketIds[id] || []);
  }

  socketCount(id: User['id']) {
    return this._socketIds[id]?.size || 0;
  }

  isOnline(id: User['id']) {
    return this.socketCount(id) > 0;
  }

  isOffline(id: User['id']) {
    return !this.isOnline(id);
  }
}
