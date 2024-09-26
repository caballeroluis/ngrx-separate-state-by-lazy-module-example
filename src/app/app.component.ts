import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.reducer';
import { selectUsername } from './store/app.selectors';
import * as AppActions from './store/app.actions';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  username$: Observable<string | null> = null!;

  constructor(
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit() {
    this.username$ = this.store.select(selectUsername);
  }

  onLogout() {
    this.store.dispatch(AppActions.logout());
  }
}
