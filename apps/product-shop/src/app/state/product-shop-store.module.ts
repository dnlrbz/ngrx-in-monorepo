import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffects } from "../../../../../libs/shared-store/src/lib/state/products.effects";
import { ProductShopEffects } from "./product-shop-effects.service";
import { StoreModule } from "@ngrx/store";
import { PRODUCTS_FEATURE_KEY } from "shared-store";
import { productShopReducer } from "./product-shop.reducer";


@NgModule({
  imports: [
    EffectsModule.forRoot([ProductsEffects, ProductShopEffects]),
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productShopReducer),
  ],
  exports: [StoreModule],
})
export class ProductShopStoreModule {}
