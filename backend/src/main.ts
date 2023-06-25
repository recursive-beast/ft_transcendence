import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.use(cookieParser(cookie_secret));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}

bootstrap();
