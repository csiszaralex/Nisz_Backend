import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = ctx.switchToHttp().getResponse();
    const now = Date.now();

    //: Mennyi idő alatt futott le
    // return next.handle().pipe(tap(() => console.log(`Succesfully run in ${Date.now() - now}ms`)));

    //: Minden adatot "becsomagol", és hozzá csatolja a response code-ot
    return next
      .handle()
      .pipe(map(data => ({ code: res.statusCode, time: Date.now() - now, data })));

    //: 5ms után timeout
    return next.handle().pipe(
      timeout(5),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
