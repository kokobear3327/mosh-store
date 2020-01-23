import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Category } from './../../models/category';
import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable: Observable<[Category]>;
  product = {} as Product;
  subscription: Subscription;
  id: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoriesObservable = categoryService.getAllCategoriesAsObservables();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe(product => (this.product = product));
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product? ')) {
      this.productService.delete(this.id);
      this.router.navigate(['admin/products/manage']);
    }
  }
}
