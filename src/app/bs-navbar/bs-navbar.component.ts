import { AppUser } from './../models/app-user';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html'
})
export class BootstrapNavbarComponent implements OnInit {
  cartObservable: Observable<ShoppingCart>;
  appUserObservable: Observable<AppUser>;
  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.cartObservable = this.shoppingCartService.getCart();
  }
}
