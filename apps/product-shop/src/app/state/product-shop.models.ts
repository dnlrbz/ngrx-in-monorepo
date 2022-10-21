/**
 * Interface for the 'ProductRent' data
 */
import { ProductsEntity } from "shared-store";

export interface ProductShopEntity extends ProductsEntity {
  soldTo?: string;
  price?: number;
}
