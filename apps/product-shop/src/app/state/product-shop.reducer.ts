import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ProductShopEntity } from './product-shop.models';
import { productReducers, ProductsState } from "shared-store";
import { sellProduct, sellProductFailure, sellProductSuccess } from "./product-shop.actions";

export interface ProductShopState extends ProductsState {
  revenue: number
}

export const productShopAdapter: EntityAdapter<ProductShopEntity> =
  createEntityAdapter<ProductShopEntity>();

export const initialProductShopState: ProductShopState =
  productShopAdapter.getInitialState({
    isLoading: false,
    revenue: 0,
  });

const reducer = createReducer<ProductShopState | ProductsState>(
  initialProductShopState,
  on(sellProduct, (state) => ({...state, isLoading: true})),
  on(sellProductSuccess, (state, action) => productShopAdapter.upsertOne(action.sold, {
    ...state,
    isLoading: false,
    revenue: (state as ProductShopState).revenue + (action.sold?.price || 0)
  })),
  on(sellProductFailure, (state) => ({...state, isLoading: false })),
  ...productReducers,
);

export function productShopReducer(
  state: ProductShopState,
  action: Action
) {
  return reducer(state, action);
}
