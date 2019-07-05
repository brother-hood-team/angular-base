import { Action } from '@ngrx/store';
import { ILogin, IUser } from '../../models/IAuth';

export enum ActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout Success'
}

export class Login implements Action {
    readonly type = ActionTypes.LOGIN;

    constructor(public payload: ILogin) {
    }
}

export class LoginSuccess implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: IUser) {
    }
}

export class LoginFailure implements Action {
    readonly type = ActionTypes.LOGIN_FAILURE;

    constructor(public payload: any) {
    }
}

export class Logout implements Action {
    readonly type = ActionTypes.LOGOUT;
}
export class LogoutSuccess implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export type ActionsUnion = Login | LoginSuccess | LoginFailure | Logout | LogoutSuccess;
