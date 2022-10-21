import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { fetchProducts, getProductsLoading, ProductsEntity } from "shared-store";
import { sellProduct } from "./state/product-shop.actions";
import { ProductShopEntity } from "./state/product-shop.models";
import { FormArray, FormControl } from "@angular/forms";
import { selectAllShopProducts, selectRevenue } from "./state/product-shop.selectors";
import { ProductShopState } from "./state/product-shop.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products$!: Observable<ProductShopEntity[]>;
  isLoading$!: Observable<boolean>;
  shopRevenue!: Observable<number>;

  soldTo!: FormArray;

  constructor(private store: Store<ProductShopState>) {
  }

  ngOnInit() {
    this.products$ = this.store.select(selectAllShopProducts).pipe(tap((products) => {
      this.soldTo = new FormArray<FormControl<string>>([]);
      products.forEach(product => {
        this.soldTo.push(new FormControl(product?.soldTo));
      })
    }));
    this.isLoading$ = this.store.select(getProductsLoading);
    this.shopRevenue = this.store.select(selectRevenue);
  }

  fetchAllProducts() {
    this.store.dispatch(fetchProducts());
  }

  sellProduct(productToSell: ProductsEntity, index: number): void {
    const sellTo = this.soldTo.at(index)?.value;
    this.store.dispatch(sellProduct({ sellTo, productToSell }));
  }
}
