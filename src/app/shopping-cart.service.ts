import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  itemObservable;
  constructor(private database: AngularFireDatabase) {}

  create() {
    return this.database.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    this.itemObservable = this.getItem(cartId, product.key);
    this.itemObservable
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        this.itemObservable.update({
          product: product,
          quantity:
            (item.payload.val() && item.payload.val().quantity
              ? item.payload.val().quantity
              : 0) + change
        });
      });
  }

  private getItem(cartId: string, productId: string) {
    return this.database.object(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.database
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((cart: any) => new ShoppingCart(cart.items)));
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
}
