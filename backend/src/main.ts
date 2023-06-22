import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const cookie_secret = configService.get("COOKIE_SECRET");

  app.use(cookieParser(cookie_secret));
  await app.listen(3000);
}

bootstrap();
