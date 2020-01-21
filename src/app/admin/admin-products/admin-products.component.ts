import { Product } from './../../models/product';
import { Observable } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent {
  productsObservable: Observable<[Product]>;
  constructor(private productService: ProductService) {
    this.productsObservable = productService.getProductsObservable();
  }
}
