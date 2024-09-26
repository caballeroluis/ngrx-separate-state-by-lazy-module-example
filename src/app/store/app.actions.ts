import { createAction, props } from '@ngrx/store';

export const setUsername = createAction(
  '[Auth] Set Username',
  props<{ username: string }>()
);

export const logout = createAction('[Auth] Logout');

export const resetUsername = createAction('[Auth] Reset Username');