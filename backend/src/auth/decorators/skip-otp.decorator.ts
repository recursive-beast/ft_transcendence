import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_OTP_KEY = 'IS_SKIP_OTP';
export const skipOTP = () => SetMetadata(IS_SKIP_OTP_KEY, true);
