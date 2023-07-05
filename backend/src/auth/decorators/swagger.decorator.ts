import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function Api0AuthUrl() {
  return applyDecorators(
    ApiOperation({
      summary: 'Redirects to OAuth authorization URL or returns JWT token',
      description:
        'This endpoint is used to either redirect to an OAuth authorization URL or to return a JWT token, depending on whether an authorization code is provided in the request.',
    }),
    ApiParam({
      name: 'code',
      type: 'string',
      required: false,
      description: 'The authorization code to exchange for a JWT token',
    }),
    ApiBadRequestResponse({ description: 'Invalid authorization code' }),
    ApiFoundResponse({ description: 'Redirects to OAuth authorization URL' }),
  );
}
