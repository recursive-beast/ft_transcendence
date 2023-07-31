import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { rimraf } from 'rimraf';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileCleanupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const files: Express.Multer.File[] = [];

    if (req.file) files.push(req.file);

    if (req.files) {
      if (Array.isArray(req.files)) {
        files.push(...req.files);
      } else {
        files.push(...Object.values(req.files).flat());
      }
    }

    return next.handle().pipe(
      tap(async () => {
        try {
          await rimraf(files.map((file) => file.path));
        } catch (error) {
          console.log(error); // print and ignore error
        }
      }),
    );
  }
}
