import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser(cookie_secret));
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
