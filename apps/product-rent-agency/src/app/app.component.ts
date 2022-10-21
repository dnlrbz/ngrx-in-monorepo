import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { fetchProducts, getProductsLoading, ProductsEntity } from "shared-store";
import { rentProduct } from "./state/product-rent.actions";
import { ProductRentEntity } from "./state/product-rent.models";
import { FormArray, FormControl } from "@angular/forms";
import { selectAllRentProducts, selectRentedNumber } from "./state/product-rent.selectors";
import { ProductRentState } from "./state/product-rent.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products$!: Observable<ProductRentEntity[]>;
  isLoading$!: Observable<boolean>;
  rentedAmount!: Observable<number>;

  rentToNames!: FormArray;

  constructor(private store: Store<ProductRentState>) {
  }

  ngOnInit() {
    this.products$ = this.store.select(selectAllRentProducts).pipe(tap((products) => {
      this.rentToNames = new FormArray<FormControl<string>>([]);
      products.forEach(product => {
        this.rentToNames.push(new FormControl(product?.rentedTo));
      })
    }));
    this.isLoading$ = this.store.select(getProductsLoading);
    this.rentedAmount = this.store.select(selectRentedNumber);
  }

  fetchAllProducts() {
    this.store.dispatch(fetchProducts());
  }

  rentProduct(productToRent: ProductsEntity, index: number): void {
    const rentTo = this.rentToNames.at(index)?.value;
    this.store.dispatch(rentProduct({ productToRent, rentTo}));
  }
}
