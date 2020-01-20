import { Observable } from 'rxjs';
import { ProductsComponent } from './products/products.component';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<[Category]> {
    return this.db.list('/categories').valueChanges() as Observable<[Category]>;
  }
}
