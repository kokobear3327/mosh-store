import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Category } from './../../models/category';
import { Product } from './../../models/product';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  productsObservable: Observable<[Product]>;
  categoriesObservable: Observable<[Category]>;
  product: Product;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoriesObservable = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/products']);
  }
}
