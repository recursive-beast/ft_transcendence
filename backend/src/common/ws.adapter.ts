import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsException } from '@nestjs/websockets';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { JWTStrategy } from 'src/auth/strategies/jwt.strategy';

// @ts-ignore
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

@Injectable()
export class WSAdapter extends IoAdapter {
  constructor(
    private app: INestApplication,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: this.configService.get('FRONTEND_ORIGIN'),
        credentials: true,
      },
    });
    const strategy = this.app.get(JWTStrategy);
    const cookie_secret = this.configService.get('COOKIE_SECRET');

    server.use(wrap(cookieParser(cookie_secret)));

    server.use((socket, next) => {
      strategy.success = (user: Express.User) => {
        socket.data = { id: user.user.id };
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
