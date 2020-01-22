import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class ProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getProductsObservable()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
