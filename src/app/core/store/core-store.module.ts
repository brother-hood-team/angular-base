import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/effects';
import * as fromCore from './index';
import {routerReducer} from '../router/reducers';
import {metaReducers} from '../meta/reducers';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomRouterStateSerializer} from '../router/router.serializer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(routerReducer, {metaReducers}),

    StoreModule.forFeature('core', fromCore.reducers),
    StoreModule.forFeature('router', routerReducer),

    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    EffectsModule.forRoot([AuthEffects]),
  ]
})
export class CoreStoreModule {
}
