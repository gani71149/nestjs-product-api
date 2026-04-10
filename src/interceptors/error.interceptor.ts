import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof Error && err.message === 'Book not found') {
          return throwError(() => new NotFoundException(err.message));
        }
        return throwError(() => err);
      }),
    );
  }
}