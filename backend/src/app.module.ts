import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        '42_CLIENT_ID': Joi.string().required(),
        '42_CLIENT_SECRET': Joi.string().required(),
        '42_CALLBACK_URL': Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('24h'),
        COOKIE_SECRET: Joi.string().required(),
        APP_NAME: Joi.string().required(),
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
