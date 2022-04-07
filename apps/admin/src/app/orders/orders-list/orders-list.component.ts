import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@nx-repo/orders';
import { ToastService } from '@nx-repo/ui';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  orders: Order[] = [];

  ngOnInit(): void {
    console.log('Orders list initialized');
    this.getOrders();
  }

  /**
   * Gets orders from ordersService
   */
  getOrders() {
    this.ordersService.getOrders().subscribe((rsp) => {
      this.orders = rsp;
    });
    console.group('Orders');
    console.log(this.orders);
  }
}
