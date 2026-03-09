import { createReducer, on, createAction } from '@ngrx/store';

// Acción simple para probar la persistencia
export const testAction = createAction('[New] Test Action');

export const initialState = {
  data: 'Estado inicial del nuevo módulo'
};

export const newReducer = createReducer(
  initialState,
  on(testAction, (state) => ({ ...state, data: '¡Estado modificado y persistido!' }))
);