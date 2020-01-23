import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html'
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  userId: string;
  cart: ShoppingCart;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    let cart = this.shoppingCartService.getCart();

    const userSubscription = this.authService.userObservable.subscribe(
      user => (this.userId = user.uid)
    );

    const cartSubscription = cart.subscribe(cart => (this.cart = cart));

    this.subscriptions.push(userSubscription);
    this.subscriptions.push(cartSubscription);
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = this.orderService.placeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
