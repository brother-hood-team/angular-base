import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/effects';
import * as fromCore from './index';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('core', fromCore.reducers),
    EffectsModule.forRoot([AuthEffects]),
  ]
})
export class CoreStoreModule { }
