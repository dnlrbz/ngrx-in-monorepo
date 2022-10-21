import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_TOKEN, fetchProducts, fetchProductsSuccess, ProductsEntity } from "shared-store";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, map, mergeMap, of } from "rxjs";
import { mockProducts } from "../mock-products";

@Injectable()
export class ProductsEffects {

  fetchProducts = createEffect(() => this.actions$.pipe(
      ofType(fetchProducts),
      delay(500),
      mergeMap(() => this.http.get<ProductsEntity[]>(`${this.apiUrl}/products`).pipe(
        //simulate API call. It fails HTTP 404, hence return mock products
        map(products => fetchProductsSuccess({products})),
        catchError(() => of(fetchProductsSuccess({products: mockProducts})))
      ))
    )
  );

  constructor(private readonly actions$: Actions,
              @Inject(API_TOKEN) private readonly apiUrl: string,
              private readonly http: HttpClient) {
  }
}
