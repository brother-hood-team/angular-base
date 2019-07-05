import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { IToken } from '../../models/IAuth';
import { OAUTH2_CREDENTIALS } from '../../../config/api.rest.config';
import { BadRequestError } from '../../errors/badrequest.error';
import { NotFoundError } from '../../errors/notfound.error';
import { UnknownError } from '../../errors/unknown.error';
import { UnAuthorizedError } from '../../errors/unauthorized.error';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = this.authenticationService.getAuthToken();
    if (!authToken || this.isRefreshingToken) {
      return next.handle(this.addBasicToRequest(request))
        .pipe(
          catchError(err => this.manageError(err)));
    }
    return next.handle(this.addTokenToRequest(request, this.authenticationService.getAuthToken()))
      .pipe(
        catchError(err => this.manageError(err, request, next)));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private addBasicToRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Basic ${btoa(
          `${OAUTH2_CREDENTIALS.CLIENT_ID}:${OAUTH2_CREDENTIALS.CLIENT_PASSWORD}`)}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authenticationService.refreshToken()
        .pipe(
          switchMap((user: IToken) => {
            if (user) {
              this.tokenSubject.next(user.access_token);
              localStorage.setItem('currentUser', JSON.stringify(user));
              return next.handle(this.addTokenToRequest(request, user.access_token));
            }

            return this.authenticationService.logout() as any;
          }),
          catchError(err => {
            return throwError(new UnAuthorizedError(err));
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
  private manageError(err: any, request?: any, next?: any) {
    if (err instanceof HttpErrorResponse) {
      switch ((err as HttpErrorResponse).status) {
        case 401:
          return (next && request) ? this.handle401Error(request, next) : throwError(new UnAuthorizedError(err));
        case 400:
          return throwError(new BadRequestError(err));
        case 404:
          return throwError(new NotFoundError(err));
      }
    } else {
      return throwError(new UnknownError(err));
    }
  }
}
