import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadListData = createAction('[List] Load List Data');

export const setListData = createAction(
    '[List] Set List Data',
    props<{ listData: Product }>()
);

export const addProductToList = createAction(
    '[List] Add Product To List',
    props<{ product: Product }>()
);

export const removeProductFromList = createAction(
    '[List] Remove Product From List',
    props<{ product: Product }>()
);
