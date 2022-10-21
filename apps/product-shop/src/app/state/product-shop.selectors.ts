import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY } from "shared-store";
import { productShopAdapter, ProductShopState } from "./product-shop.reducer";

// Lookup the 'ProductRent' feature state managed by NgRx
export const getProductShopState = createFeatureSelector<ProductShopState>(
  PRODUCTS_FEATURE_KEY
);

const { selectAll } = productShopAdapter.getSelectors(getProductShopState);

export const selectAllShopProducts = selectAll;

export const selectRevenue = createSelector(getProductShopState, (state) => state.revenue);



