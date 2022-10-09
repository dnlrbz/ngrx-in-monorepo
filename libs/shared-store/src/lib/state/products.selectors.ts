import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, productsAdapter, ProductsState, } from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const getProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

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

export const getProductsLoading = createSelector(
  getProductsState,
  (state) => state.isLoading
);
