import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { selectUsername } from '../../store/app.selectors';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  username$: Observable<string | null> = null!;
  usernameInput: string = '';

  constructor(
    private authService: AuthService,
    private store: Store<{ app: AppState }>,
  ) {}

  ngOnInit() {
    this.username$ = this.store.select(selectUsername);
  }

  onLogin() {
    if (this.usernameInput) {
      this.authService.fakeAuth(this.usernameInput);
    }
  }
}
