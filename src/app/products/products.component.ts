import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { Product } from './../models/product';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cartObservable;
  subscription: Subscription;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService
      .getProducts()
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
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => (this.cartObservable = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
