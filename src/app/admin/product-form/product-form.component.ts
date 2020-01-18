import { Router } from '@angular/router';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categories$;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    categoryService
      .getCategories()
      .valueChanges()
      .subscribe(category => (this.categories$ = category));
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/products']);
  }
}
