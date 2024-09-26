import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from './list.reducer';

export const selectListState = createFeatureSelector<ListState>('list');

export const selectListData = createSelector(
  selectListState,
  (state: ListState) => state.data
);

export const selectShoppingList = createSelector(
  selectListState,
  (state: ListState) => state.shoppingList.products
);
