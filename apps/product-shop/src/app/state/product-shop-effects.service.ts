import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { API_TOKEN } from "shared-store";
import { HttpClient } from "@angular/common/http";
import { sellProduct, sellProductSuccess } from "./product-shop.actions";
import { catchError, delay, map, mergeMap, of } from "rxjs";
import { ProductShopEntity } from "./product-shop.models";

@Injectable()
export class ProductShopEffects {

  sellProduct = createEffect(() => this.actions$.pipe(
    ofType(sellProduct),
    delay(300),
    mergeMap(action => this.http.post<ProductShopEntity>(`${this.apiUrl}/sell/${action.productToSell.id}/${action.sellTo}`, action.productToSell).pipe(
      //simulate API call. It fails HTTP 404, hence return mock sold product
      map(soldProduct => sellProductSuccess({
          sold: {
            ...action.productToSell,
            soldTo: action.sellTo
          }
        })),
        catchError(() => of(sellProductSuccess({
          sold: {
            ...action.productToSell,
            soldTo: action.sellTo
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
