import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

function enableSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(configService.getOrThrow('APP_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const cookie_secret = configService.get('COOKIE_SECRET');

  app.use(cookieParser(cookie_secret));
  if (configService.get('NODE_ENV') !== 'production') enableSwagger(app);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
