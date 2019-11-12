import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './../../models';
import { ShopService } from './../../services/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  // Properties
  cart$: Cart;
  
  // TODO: Probably change the full-screen hero for cart to just a thin header with no hero

  // Constructor (Dependency Injection)
  constructor(
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) { }

  // Initialization
  ngOnInit() {
    this.shopService.currentCart$.subscribe(c => this.cart$ = c);
    // this.mockCart();
  }


  updateItemQty(item) { 
    this.shopService.updateItem(item);
    this.snackBar.open('Cart updated.', 'Ok', 
        { duration: 3000, verticalPosition: 'top' });
  }

  removeItem(item) { 
    this.shopService.removeItem(item);
    this.snackBar.open('Item removed from cart.', 'Ok', 
        { duration: 3000, verticalPosition: 'top' });
  }

  submitOrder() {
    let valid = this.validateCheckout();
    if (valid) { 
      this.snackBar.open('Order submitted!', 'Ok', 
        { duration: 5000, verticalPosition: 'top' });
    }
    else {
      this.snackBar.open('Invalid checkout form. Please fix', 'Ok', 
        { duration: 5000, verticalPosition: 'top' });
    }
    
  }

  private validateCheckout(): boolean {
    // check to make sure all fields are filled in
    return false;
  }





  private mockCart() { 
    let c: Cart = {
      orderId: 'abcdefg',
      items: [],
      totalItems: 4,
      totalBasePrice: 22.00,
      totalPriceWithTax: 24.20

    }
    c.items.push({ 
      id: 1,
      name: 'Hog Hunter - Gold', 
      description: 'Our best selling spinner. The Gold Hog Hunter is perfectly designed to be productive in any conditions.',
      price: 5.50,
      image: 'spinner-gold-hoghunter.jpg',
      qty: 2,
      qtyPrice: 11.00
    });

    c.items.push({
      id: 2,
      name: 'Hog Hunter - Silver', 
      description: 'The Silver bladed version of our best selling Hog Hunter. For when you need that extra bit of flash.',
      price: 5.50,
      image: 'spinner-silver-hoghunter.jpg',
      qty: 1,
      qtyPrice: 5.50
    });

    c.items.push({
      id: 3,
      name: 'Hog Hunter - Halloween', 
      description: 'Stealth black blade with alternating orange and black beaded body. Halloween themed. It\'s scary good!',
      price: 5.50,
      image: 'spinner-halloween-hoghunter.jpg',
      qty: 1,
      qtyPrice: 5.50
    });

    //this.cart$ = c;
    this.shopService.setMockCart(c);
  }

}
