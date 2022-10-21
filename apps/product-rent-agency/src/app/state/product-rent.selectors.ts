import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY } from "shared-store";
import { productRentAdapter, ProductRentState } from "./product-rent.reducer";

// Lookup the 'ProductRent' feature state managed by NgRx
export const getProductRentState = createFeatureSelector<ProductRentState>(
  PRODUCTS_FEATURE_KEY
);

const { selectAll } = productRentAdapter.getSelectors(getProductRentState);

export const selectAllRentProducts = selectAll;


export const selectRentedNumber = createSelector(getProductRentState, (state) => state.rentedNumber);

