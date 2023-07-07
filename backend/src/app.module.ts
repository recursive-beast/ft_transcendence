import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core';
import * as Joi from 'joi';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
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
    UserModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
        }),
    },
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
