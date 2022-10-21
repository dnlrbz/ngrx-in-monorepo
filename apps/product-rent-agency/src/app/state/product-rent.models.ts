/**
 * Interface for the 'ProductRent' data
 */
import { ProductsEntity } from "shared-store";

export interface ProductRentEntity extends ProductsEntity {
  rentedTo?: string;
}
