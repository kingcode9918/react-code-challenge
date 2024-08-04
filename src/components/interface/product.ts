import { Review } from "./review";

export interface Product {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  categoryId: string;
  categoryName: string;
  price: string;
  currency: string;
  details: string;
  reviews: Review[];
}
