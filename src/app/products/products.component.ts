import { Category } from './../models/category';
import { Product } from './../models/product';
import { Observable } from 'rxjs';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productsObservable: Observable<[Product]>;
  categoriesObservable: Observable<[Category]>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productsObservable = productService.getProducts();

    this.categoriesObservable = categoryService.getCategories();
  }
}
