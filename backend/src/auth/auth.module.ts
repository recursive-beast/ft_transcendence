import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { Strategy42 } from './strategies/42.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JWTGuard } from './guards/jwt.guard';
import { JWTOTPStrategy } from './strategies/jwt-otp.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWTOTPGuard } from './guards/jwt-otp.guard';

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
