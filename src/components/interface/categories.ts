import { Product } from "./product";

export interface Categories {
  id: string;
  name: string;
  products: Product[];
}
