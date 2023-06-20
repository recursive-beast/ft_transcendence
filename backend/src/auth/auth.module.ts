import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { Strategy42 } from './strategies/42.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        '42_CLIENT_ID': Joi.string().required(),
        '42_CLIENT_SECRET': Joi.string().required(),
        '42_CALLBACK_URL': Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [Strategy42, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
