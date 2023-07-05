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
    .addOAuth2(
      {
        type: 'oauth2',
        name: '42 intra',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://api.intra.42.fr/oauth/authorize',
            tokenUrl: 'https://api.intra.42.fr/oauth/token',
            scopes: {
              profile: 'View your basic profile information',
            },
          },
        },
      },
      '42 intra',
    )
    .addOAuth2(
      {
        type: 'oauth2',
        name: 'google',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenUrl: 'https://oauth2.googleapis.com/token',
            scopes: {
              email: 'View your email address',
              profile: 'View your basic profile information',
            },
          },
        },
      },
      'google',
    )
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
