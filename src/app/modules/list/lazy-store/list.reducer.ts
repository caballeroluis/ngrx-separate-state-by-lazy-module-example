import { createReducer, on, Action } from '@ngrx/store';
import * as ListActions from './list.actions';
import { ProductList, Product } from '../models/product.model';

export interface ListState {
  data: Product | null;
  shoppingList: ProductList;
}

export const initialState: ListState = {
  data: null,
  shoppingList: { products: [] }
};

const _listReducer = createReducer(
  initialState,
  on(ListActions.setListData, (state: ListState, { listData }) => ({
    ...state,
    data: listData,
  })),
  on(ListActions.addProductToList, (state: ListState, { product }) => ({
    ...state,
    shoppingList: {
      products: [...state.shoppingList.products, product]
    }
  })),
  on(ListActions.removeProductFromList, (state: ListState, { product }) => ({
    ...state,
    shoppingList: {
      products: state.shoppingList.products.filter(p => p.name !== product.name)
    }
  }))
);

export function listReducer(state: ListState | undefined, action: Action) {
  return _listReducer(state, action);
}
