import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/effects';
import * as fromCore from './index';
import { routerReducer } from '../router/reducers';
import { metaReducers } from '../meta/reducers';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(routerReducer, { metaReducers }),
    StoreModule.forFeature('core', fromCore.reducers),
    EffectsModule.forRoot([AuthEffects]),
  ]
})
export class CoreStoreModule { }
