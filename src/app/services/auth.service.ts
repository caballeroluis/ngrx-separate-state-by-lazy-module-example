import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppActions from '../store/app.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usernameSubject = new BehaviorSubject<string | null>(null);
    username$ = this.usernameSubject.asObservable();

    constructor(private store: Store) {}

    fakeAuth(username: string): string {
        this.usernameSubject.next(username);
        this.store.dispatch(AppActions.setUsername({ username }));
        return username;
    }

}
