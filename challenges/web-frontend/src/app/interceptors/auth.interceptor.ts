import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.sessionService.getSession().pipe(
      first(),
      switchMap((session: LoginDTO) => {
        let authRequest = request;
        if (!!session) {
          const headers = {
            userId: session.userId,
            authtoken: session.token
          };

          // Clone the request and set the new header in one step.
          authRequest = request.clone({
            setHeaders: headers
          });
        }

        // send cloned request with header to the next handler.
        return next.handle(authRequest);
      })
    );
  }
}
