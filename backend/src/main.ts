import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { JwtIoAdapter } from './auth/jwt-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.useStaticAssets('public', { prefix: '/static' });
  app.use(cookieParser(cookie_secret));
  app.useWebSocketAdapter(new JwtIoAdapter(app));
  await app.listen(3000);
}

bootstrap();
