import { OrderService } from './../../order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent {
  orders;

  constructor(private orderService: OrderService) {
    this.orders = orderService.getOrders();
  }
}
