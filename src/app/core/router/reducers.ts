import { RouterStateUrl } from './router.serializer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const routerReducer: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}
