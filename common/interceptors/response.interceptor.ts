
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Global } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    replaceNullWithEmptyString<T>(data: T | T[]): T | T[] {
        if (Array.isArray(data)) {
          return data.map((item) => {
            if (typeof item === 'object') {
              for (const key in item) {
                if (item[key] === null || item[key] === undefined) {
                  delete item[key];
                }
                if(key == 'password'){
                    delete item[key];
                }
              }
            }
            return item;
          });
        } else if (typeof data === 'object') {
          for (const key in data) {
            if (data[key] === null || data[key] === undefined) {
              delete data[key];
            }
            if(key == 'password'){
                delete data[key];
            }
          }
          return data;
        } else {
          return data;
        }
      }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value => this.replaceNullWithEmptyString(value.payload.data)));
  }
}
