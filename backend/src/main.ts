import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { WSAdapter } from './common/ws.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.setGlobalPrefix('/api');
  app.use(cookieParser(cookie_secret));
  app.useWebSocketAdapter(new WSAdapter(app));
  await app.listen(3000);
}

bootstrap();
