import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<string, any>();

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const key = req.url;

    if (cache.has(key)) {
      console.log(`Cache HIT for ${key}`);
      return of(cache.get(key));
    }

    console.log(`Cache MISS — storing ${key}`);
    return next.handle().pipe(
      tap(data => cache.set(key, data)),
    );
  }
}