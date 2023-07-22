import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';
import { IS_SKIP_OTP_KEY } from './skip-otp.decorator';

@Injectable()
export class OTPGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isSkipOTP = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_OTP_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic || isSkipOTP) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) return false;

    const { user, jwtPayload } = request.user;

    return !user.otpIsEnabled || Boolean(jwtPayload?.otp_is_verified);
  }
}
