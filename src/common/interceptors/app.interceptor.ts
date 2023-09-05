import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import {
  DefaultException,
} from '../exceptions';
import { AuthorNotFoundException } from '../../authors/exceptions';
import { ArticleNotFoundException } from '../../articles/exceptions';

const exceptions = [
  // Authors
  AuthorNotFoundException,

  // Articles
  ArticleNotFoundException,
];

@Injectable()
export default class AppInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (exceptions.some((exception) => err instanceof exception)) {
            throw err;
          }

          throw new DefaultException();
        }),
      );
  }
}
