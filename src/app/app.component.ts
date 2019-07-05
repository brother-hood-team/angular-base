import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login, Logout } from './core/store/auth/actions';
import { IAuthState } from './core/models/IAuth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'angular-base';

  constructor(private store: Store<IAuthState>) {
  }

  public logout() {
    this.store.dispatch(new Logout());
  }
  public login() {
    this.store.dispatch(new Login({ username: 'allens', password: 'a' }));
  }
}
