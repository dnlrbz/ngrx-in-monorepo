import { createAction, props } from "@ngrx/store";
import { ProductShopEntity } from "./product-shop.models";
import { ProductsEntity } from "shared-store";

export enum ProductShopActions {
  SELL_PRODUCT = '[Product sell] sell product',
  SELL_PRODUCT_SUCCESS = '[Product sell] sell product success',
  SELL_PRODUCT_FAILURE = '[Product sell] sell product failure',
}

export const sellProduct = createAction(ProductShopActions.SELL_PRODUCT, props<{ productToSell: ProductsEntity, sellTo: string }>());
export const sellProductSuccess = createAction(ProductShopActions.SELL_PRODUCT_SUCCESS, props<{ sold: ProductShopEntity }>());
export const sellProductFailure = createAction(ProductShopActions.SELL_PRODUCT_FAILURE);
