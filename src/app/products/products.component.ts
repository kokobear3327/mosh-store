// import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnDestroy {
  productsObservable: Observable<[Product]>;
  category: string;
  filteredProducts: Product[];
  products: Product[] = [];
  productSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productSubscription = productService
      .getProducts()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );

    route.queryParamMap.subscribe(parameters => {
      this.category = parameters.get('category');
      this.filteredProducts = this.category
        ? this.products.filter(
            product =>
              product.category.toLowerCase() === this.category.toLowerCase()
          )
        : this.products;
    });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
