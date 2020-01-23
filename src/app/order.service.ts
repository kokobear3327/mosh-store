import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private database: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  placeOrder(order) {
    let result = this.database.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.database.list('/orders');
  }
}
