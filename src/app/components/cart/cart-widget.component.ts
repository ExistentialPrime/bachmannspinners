import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './../../models';
import { ShopService } from './../../services/shop.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html'
})
export class CartWidgetComponent implements OnInit {

  // Properties
  expandCart: boolean = false;
  cart$: Cart;

  // Constructor (Dependency Injection)
  constructor(
    private shopService: ShopService
  ) { }

  // Initialization
  ngOnInit() {
    this.shopService.currentCart$.subscribe(c => this.cartUpdated(c));
  }

  private cartUpdated(cart: Cart): void {
    this.cart$ = cart;
  } 

  removeItemFromCart(item: CartItem): void {
    // this.shopService.removeItem(item);
  }

  toggleExpanded() { 
    this.expandCart = !this.expandCart;
  }

}
