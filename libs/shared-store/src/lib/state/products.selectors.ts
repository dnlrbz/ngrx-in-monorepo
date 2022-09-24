import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCTS_FEATURE_KEY,
  ProductsState,
  productsAdapter,
} from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const getProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

export const getProductsLoaded = createSelector(
  getProductsState,
  (state: ProductsState) => state.loaded
);

export const getProductsError = createSelector(
  getProductsState,
  (state: ProductsState) => state.error
);

export const getAllProducts = createSelector(
  getProductsState,
  (state: ProductsState) => selectAll(state)
);

export const getProductsEntities = createSelector(
  getProductsState,
  (state: ProductsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProductsState,
  (state: ProductsState) => state.selectedId
);

export const getSelected = createSelector(
  getProductsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
