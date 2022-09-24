import { Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';
import {
  ProductsState,
  initialProductsState,
  productsReducer,
} from './products.reducer';

describe('Products Reducer', () => {
  const createProductsEntity = (id: string, name = ''): ProductsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Products actions', () => {
    it('loadProductsSuccess should return the list of known Products', () => {
      const products = [
        createProductsEntity('PRODUCT-AAA'),
        createProductsEntity('PRODUCT-zzz'),
      ];
      const action = ProductsActions.loadProductsSuccess({ products });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = productsReducer(initialProductsState, action);

      expect(result).toBe(initialProductsState);
    });
  });
});
