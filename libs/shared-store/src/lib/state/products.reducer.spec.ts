import { ProductsEntity } from './products.models';

describe('Products Reducer', () => {
  const createProductsEntity = (id: string, name = ''): ProductsEntity => ({
    id,
    name: name || `name-${id}`,
  });
});
