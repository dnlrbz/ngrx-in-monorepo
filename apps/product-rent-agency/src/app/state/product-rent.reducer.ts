import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ProductRentEntity } from './product-rent.models';
import { productReducers, ProductsState } from "shared-store";
import { rentProduct, rentProductFailure, rentProductSuccess } from "./product-rent.actions";

export interface ProductRentState extends ProductsState {
  rentedNumber: number;
}

export const productRentAdapter: EntityAdapter<ProductRentEntity> =
  createEntityAdapter<ProductRentEntity>();

export const initialProductRentState: ProductRentState =
  productRentAdapter.getInitialState({
    isLoading: false,
    rentedNumber: 0,
  });

const reducer = createReducer<ProductRentState | ProductsState>(
  initialProductRentState,
  on(rentProduct, (state) => ({...state, isLoading: true})),
  on(rentProductSuccess, (state, action) => productRentAdapter.upsertOne(action.rentedProduct, {
    ...state,
    isLoading: false,
    rentedNumber: (state as ProductRentState).rentedNumber + 1
  })),
  on(rentProductFailure, (state) => ({...state, isLoading: false })),
  ...productReducers,
);

export function productRentReducer(
  state: ProductRentState,
  action: Action
) {
  return reducer(state, action);
}
