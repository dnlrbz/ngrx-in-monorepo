import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffects } from "../../../../../libs/shared-store/src/lib/state/products.effects";
import { ProductRentEffects } from "./product-rent.effects";
import { StoreModule } from "@ngrx/store";
import { PRODUCTS_FEATURE_KEY } from "shared-store";
import { productRentReducer } from "./product-rent.reducer";


@NgModule({
  imports: [
    EffectsModule.forRoot([ProductsEffects, ProductRentEffects]),
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productRentReducer),
  ],
  exports: [StoreModule],
})
export class ProductRentStoreModule {}
