import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
  username: string | null;
}

export const initialState: AppState = {
  username: null,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setUsername, (state, { username }) => ({
    ...state,
    username,
  })),
  on(AppActions.resetUsername, (state) => ({
    ...state,
    username: null,
  }))
);
