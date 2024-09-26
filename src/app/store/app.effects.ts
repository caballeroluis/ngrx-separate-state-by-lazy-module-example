import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.logout),
        tap(() => {
          localStorage.clear();
        }),
        map(() => AppActions.resetUsername())
      ),
    { dispatch: true }
  );
}
