import {
  INestApplication,
  Injectable
} from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsException } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JWTStrategy } from 'src/auth/strategies/jwt.strategy';

@Injectable()
export class WSAdapter extends IoAdapter {
  constructor(private app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);
    const strategy = this.app.get(JWTStrategy);

    server.use((socket, next) => {
      strategy.success = (user) => {
        socket.data = user;
        next();
      };

      strategy.fail = () => next(new WsException('Unauthorized'));
      strategy.error = next;
      // @ts-ignore
      strategy.authenticate(socket.request, {});
    });

    return server;
  }
}
