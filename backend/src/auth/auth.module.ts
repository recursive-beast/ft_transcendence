import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTOTPGuard } from './guards/jwt-otp.guard';
import { JWTGuard } from './guards/jwt.guard';
import { Strategy42 } from './strategies/42.strategy';
import { JWTOTPStrategy } from './strategies/jwt-otp.strategy';
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
  ],
  providers: [
    Strategy42,
    JWTStrategy,
    JWTOTPStrategy,
    AuthService,
    JWTGuard,
    JWTOTPGuard,
  ],
  controllers: [AuthController],
  exports: [JWTGuard],
})
export class AuthModule {}
