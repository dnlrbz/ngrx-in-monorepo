import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { fetchProducts, fetchProductsFailure, fetchProductsSuccess } from './products.actions';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<ProductsEntity> {
  selectedId?: string | number; // which Products record has been selected
  isLoading: boolean;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const productsAdapter: EntityAdapter<ProductsEntity> =
  createEntityAdapter<ProductsEntity>();

export const initialProductsState: ProductsState =
  productsAdapter.getInitialState({
    isLoading: false,
  });

const reducer = createReducer(
  initialProductsState,
  on(fetchProducts, (state) => ({...state, isLoading: true})),
  on(fetchProductsSuccess, (state, { products }) =>
    productsAdapter.setAll(products, { ...state, isLoading: false })
  ),
  on(fetchProductsFailure, (state) => ({ ...state, isLoading: false })),
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
