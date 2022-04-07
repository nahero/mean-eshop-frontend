import { Product } from '@nx-repo/products';
import { User } from '@nx-repo/users';

export interface Order {
  _id?: string;
  user?: User;
  orderItems?: Product[];
  totalPrice?: number;
  dateOrdered?: Date;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
}
