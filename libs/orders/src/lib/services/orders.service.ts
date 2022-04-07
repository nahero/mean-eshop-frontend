import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
// { environment } is the const name, and @env/environment is file name
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLorders = environment.apiURL + 'orders';

  constructor(private httpClient: HttpClient) {}

  /**
   * @returns all orders from database
   */
  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiURLorders);
  }
  /**
   * Get single Order by id
   */
  getOrder(orderID: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiURLorders}/${orderID}`);
  }

  /**
   * Creates a new Order
   * @param Order
   */
  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiURLorders, order);
  }

  /**
   * Update Order by ID
   */
  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.apiURLorders}/${order._id}`, order);
  }

  /**
   * Deletes a Order
   * @param orderID is Order._id
   */
  deleteOrder(orderID: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.apiURLorders}/${orderID}`);
  }
}
