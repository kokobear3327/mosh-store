import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html'
})
export class BootstrapNavbarComponent implements OnInit {
  cartObservable;
  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.cartObservable = await this.shoppingCartService.getCart();
  }
}
