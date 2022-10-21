import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_TOKEN } from "shared-store";
import { HttpClient } from "@angular/common/http";
import { rentProduct, rentProductSuccess } from "./product-rent.actions";
import { catchError, delay, map, mergeMap, of } from "rxjs";
import { ProductRentEntity } from "./product-rent.models";

@Injectable()
export class ProductRentEffects {

  rentProduct = createEffect(() => this.actions$.pipe(
    ofType(rentProduct),
    delay(300),
    mergeMap(action => this.http.post<ProductRentEntity>(`${this.apiUrl}/rent/${action.productToRent.id}/${action.rentTo}`, action.productToRent).pipe(
      //simulate API call. It fails HTTP 404, hence return mock rented product
      map(rentedProduct => rentProductSuccess({
          rentedProduct: {
            ...action.productToRent,
            rentedTo: action.rentTo
          }
        })),
        catchError(() => of(rentProductSuccess({
          rentedProduct: {
            ...action.productToRent,
            rentedTo: action.rentTo
          }
        })))
      )
    )
  ));

  constructor(private readonly actions$: Actions,
              @Inject(API_TOKEN) private readonly apiUrl: string,
              private readonly http: HttpClient) {
  }
}
