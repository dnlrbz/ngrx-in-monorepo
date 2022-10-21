import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, ProductsState, } from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const getProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);


export const getProductsLoading = createSelector(
  getProductsState,
  (state) => state.isLoading
);
