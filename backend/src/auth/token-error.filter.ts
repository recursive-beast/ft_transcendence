import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TokenError } from 'passport-oauth2';

@Catch(TokenError)
export class TokenErrorFilter extends BaseExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    return super.catch(new BadRequestException(), host);
  }
}
