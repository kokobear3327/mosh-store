import { Product } from './models/product';
import { Observable } from 'rxjs';
import { ProductsComponent } from './products/products.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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
}
