import { Category } from './category';

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: [string];
  price: number;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  // category?: Category;
  category?: string;
  isFeatured?: boolean | false;
  dateCreated?: Date;
}
