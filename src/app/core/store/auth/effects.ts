import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import JwtDecode from 'jwt-decode';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUser} from '../../models/IAuth';
import {AuthenticationService} from '../../services/auth/auth.service';
import {ActionTypes, Login, LoginFailure, LoginSuccess, LogoutSuccess} from './actions';
import {Action} from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
  ) {
  }

  @Effect()
  login$: Observable<Action> = this.actions$
    .pipe(
      ofType(ActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap((payload) => {
        return this.authService
          .login(payload).pipe(
            map((user) => {
              const decodeToken: IUser = new JwtDecode(user.access_token);
              return new LoginSuccess(decodeToken);
            }),
            catchError((error) => of(new LoginFailure(error)))
          );
      })
    );
  @Effect()
  logout$: Observable<Action> = this.actions$
    .pipe(
      ofType(ActionTypes.LOGOUT),
      switchMap(() => {
        this.authService.logout();
        return of(new LogoutSuccess());
      })
    );
}
