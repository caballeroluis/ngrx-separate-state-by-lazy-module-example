import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectAppState = (state: { app: AppState }) => state.app;

export const selectUsername = createSelector(
  selectAppState,
  (state: AppState) => state.username
);
