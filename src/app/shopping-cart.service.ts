import { ShoppingCart } from './models/shopping-cart';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  itemObservable;
  constructor(private db: AngularFireDatabase) {}

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  getCart(): Observable<ShoppingCart> {
    const cartId = this.getOrCreateCartId();
    console.log('cartid', cartId);
    return this.db
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
  clearCart() {
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private updateItemQuantity(product: Product, change: number) {
    let cartId = this.getOrCreateCartId();

    this.itemObservable = this.getItem(cartId, product.id);
    this.itemObservable
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity =
          (item.payload.val() && item.payload.val().quantity
            ? item.payload.val().quantity
            : 0) + change;
        if (quantity === 0) this.itemObservable.remove();
        else
          this.itemObservable.update({
            product: product,
            quantity: quantity
          });
      });
  }
}
