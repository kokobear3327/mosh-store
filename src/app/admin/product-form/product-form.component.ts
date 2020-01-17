import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categories: String[] = [
    'Bread',
    'Dairy',
    'Fruits',
    'Seasonings',
    'Vegetables'
  ];

  constructor(private productService: ProductService) {}

  save(product) {
    this.productService.create(product);
  }
}
