import { Observable } from 'rxjs';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private database: AngularFireDatabase) {}

  getCategories() {
    return this.database
      .list('/categories', ref => {
        const sortByName = ref.orderByChild('name');
        return sortByName;
      })
      .valueChanges() as Observable<[Category]>;
  }
}
