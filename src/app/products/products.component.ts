import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnDestroy {
  cartObservable;
  products: Product[] = [];
  category: string;
  filteredProducts: Product[];
  productSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.productSubscription = productService
      .getAllProductsAsObservables()
      .pipe(
        switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter(
              product =>
                product.category.toLowerCase() === this.category.toLowerCase()
            )
          : this.products;
      });
  }

  async ngOnInit() {
    this.productSubscription = (
      await this.shoppingCartService.getCart()
    ).subscribe(cart => (this.cartObservable = cart));
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
