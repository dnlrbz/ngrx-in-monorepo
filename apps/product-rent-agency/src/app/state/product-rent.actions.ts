import { createAction, props } from "@ngrx/store";
import { ProductRentEntity } from "./product-rent.models";
import { ProductsEntity } from "shared-store";

export enum ProductRentActions {
  RENT_PRODUCT = '[Product Rent] rent product',
  RENT_PRODUCT_SUCCESS = '[Product Rent] rent product success',
  RENT_PRODUCT_FAILURE = '[Product Rent] rent product failure',
}

export const rentProduct = createAction(ProductRentActions.RENT_PRODUCT, props<{ productToRent: ProductsEntity, rentTo: string }>());
export const rentProductSuccess = createAction(ProductRentActions.RENT_PRODUCT_SUCCESS, props<{ rentedProduct: ProductRentEntity }>());
export const rentProductFailure = createAction(ProductRentActions.RENT_PRODUCT_FAILURE);
