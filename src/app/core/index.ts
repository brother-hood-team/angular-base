import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Oauth2Interceptor } from './services/auth/oauth2.interceptor';
import { RouterModule } from '@angular/router';
import { CoreStoreModule } from './store/core-store.module';
import { AuthenticationService } from './services/auth/auth.service';

export const ANGULAR_BASE = [
    HttpClientModule,
    RouterModule,
    CommonModule,
];

export const CORE_SERVICES = [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: Oauth2Interceptor, multi: true },
];

export const CORE_MODULES = [
    CoreStoreModule
];
