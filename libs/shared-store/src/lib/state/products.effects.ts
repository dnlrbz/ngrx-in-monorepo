import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class ProductsEffects {


  constructor(private readonly actions$: Actions) {}
}
