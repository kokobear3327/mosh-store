import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent {
  orders;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}
}
