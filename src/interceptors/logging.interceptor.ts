import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    console.log(`Incoming Request: ${req.method} ${req.url}`);

    return next.handle().pipe(
      tap(() => console.log(`Response Sent: ${req.method} ${req.url}`)),
    );
  }
}