import { User } from '@nx-repo/users';

export interface Order {
  _id?: string;
  user?: User;
  dateOrdered?: Date;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: boolean;
  zip?: boolean;
  country?: boolean;
  phone?: boolean;
  status?: string;
}
