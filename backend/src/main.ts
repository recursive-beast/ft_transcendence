import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.use(cookieParser(cookie_secret));
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
