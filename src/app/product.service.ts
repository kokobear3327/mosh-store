import { Product } from './models/product';
import { Observable } from 'rxjs';
import { ProductsComponent } from './products/products.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { documentToDomainObject } from './shared/angular-firebase-utility';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private database: AngularFireDatabase) {}

  create(product) {
    return this.database.list('/products').push(product);
  }

  getProducts(): Observable<[Product]> {
    return this.database.list('/products').valueChanges() as Observable<
      [Product]
    >;
  }

  getProductsObservable(): Observable<[Product]> {
    return this.database
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(
          actions =>
            actions.map(product => documentToDomainObject(product)) as [Product]
        )
      );
  }

  get(productId): Observable<Product> {
    return this.database
      .object('/products/' + productId)
      .valueChanges() as Observable<Product>;
  }

  update(productId, product) {
    return this.database.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.database.object('/products/' + productId).remove();
  }
}
