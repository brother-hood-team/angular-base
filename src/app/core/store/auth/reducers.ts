import * as Auth from '../auth/actions';
import { IAuthState } from '../../models/IAuth';

export const initialState: IAuthState = {
    user_credentials: null,
    isLogin: false,
    errorMessage: null,
};

export function reducer(
    state = initialState,
    action: Auth.ActionsUnion
): IAuthState {
    switch (action.type) {
        case Auth.ActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                user_credentials: action.payload,
                isLogin: true
            };
        }
        case Auth.ActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        case Auth.ActionTypes.LOGOUT_SUCCESS: {
            return {
                ...state,
                user_credentials: null,
                isLogin: false,
                errorMessage: null,
            };
        }
        default: {
            return state;
        }
    }
}
