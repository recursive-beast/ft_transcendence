import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FileCleanupInterceptor } from './file-cleanup.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FileCleanupInterceptor,
    },
  ],
})
export class CommonModule {}
