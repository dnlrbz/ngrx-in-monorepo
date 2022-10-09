import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';

export enum ProductActions {
  FETCH_PRODUCTS = '[Products] fetch',
  FETCH_PRODUCTS_SUCCESS = '[Products] fetch success',
  FETCH_PRODUCTS_FAILURE = '[Products] fetch failure',
}

export const fetchProducts = createAction(ProductActions.FETCH_PRODUCTS);

export const fetchProductsSuccess = createAction(ProductActions.FETCH_PRODUCTS_SUCCESS,
  props<{ products: ProductsEntity[] }>()
);

export const fetchProductsFailure = createAction(ProductActions.FETCH_PRODUCTS_FAILURE);
