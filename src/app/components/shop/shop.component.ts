import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './../../models';
import { ShopService } from './../../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  // TODO: Figure out how to store the cart in a cookie so page reloads/etc dont reset it

  // Properties
  inventory: CartItem[];
  cart$: Cart;
  

  // Constructor (Dependency Injection)
  constructor(
    private shopService: ShopService
  ) { }

  // Initialization
  ngOnInit() {
    this.inventory = this.shopService.getAllShopItems();
    this.shopService.currentCart$.subscribe(c => this.cart$ = c);
  }

  addItemToCart(item: CartItem, qty: number): void {
    qty = Number(qty);
    this.shopService.addItem(item, qty);
  }

  

}
