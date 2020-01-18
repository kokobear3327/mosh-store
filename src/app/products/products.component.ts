import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    productService
      .getProducts()
      .valueChanges()
      .subscribe(product => (this.products$ = product));
    categoryService
      .getCategories()
      .valueChanges()
      .subscribe(category => (this.categories$ = category));
  }
}
