import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import * as Joi from 'joi';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { JWTGuard } from './auth/jwt.guard';
import { OTPGuard } from './auth/otp.guard';
import { TokenErrorFilter } from './auth/token-error.filter';
import { FileCleanupInterceptor } from './common/file-cleanup.interceptor';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        '42_CLIENT_ID': Joi.string().required(),
        '42_CLIENT_SECRET': Joi.string().required(),
        '42_CALLBACK_URL': Joi.string().uri().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('24h'),
        COOKIE_SECRET: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        APP_URL: Joi.string().uri().required(),
        NODE_ENV: Joi.string()
          .valid('production', 'development')
          .default('development'),
      }),
    }),
    AuthModule,
    UserModule,
    NotificationModule,
  ],
  providers: [
    providePrismaClientExceptionFilter(),
    {
      provide: APP_FILTER,
      useClass: TokenErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
    {
      provide: APP_GUARD,
      useClass: OTPGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FileCleanupInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class AppModule {}
