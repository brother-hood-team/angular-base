import { NgModule, Optional, SkipSelf } from '@angular/core';
import * as fromCore from './index';

@NgModule({
  declarations: [],
  imports: [
    fromCore.ANGULAR_BASE,
    fromCore.CORE_MODULES
  ],
  providers: fromCore.CORE_SERVICES,
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core Module is already loaded. Import only in AppModule');
    }
  }
}
