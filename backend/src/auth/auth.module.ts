import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTGuard } from './jwt.guard';
import { OTPGuard } from './otp.guard';
import { FortyTwoStrategy } from './strategies/42.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [
    FortyTwoStrategy,
    JWTStrategy,
    GoogleStrategy,
    AuthService,
    JWTGuard,
    OTPGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
