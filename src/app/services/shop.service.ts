import { Injectable } from '@angular/core';
import { Cart, CartItem } from './../models';
import { ALLSHOPITEMS } from './../models/item-list';
import { HelperService } from './helper.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, take, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // Properties
  // Observable cart object for other components to subscribe to
  private newCart: Cart = { orderId: 'notavalidorder' };
  private _currentCart = new BehaviorSubject<Cart>({ orderId: 'notavalidorder' });
  public currentCart$: Observable<Cart> = this._currentCart.asObservable().pipe(filter<Cart>(Boolean), distinctUntilChanged());

  // Constructor (Dependency Injection and Setup)
  constructor(
    private helper: HelperService,
  ) {
    this.generateNewCart();
  }

  // Grab our list of items in the shop
  public getAllShopItems(): CartItem[] {
    let items = ALLSHOPITEMS;
    items.forEach(i => {
      i.qty = 1;
      i.qtyPrice = i.qty * i.price;
    });
    return items;
  }

  // Create a new shopping cart
  public generateNewCart(): void {
    let c: Cart = {
      orderId: this.helper.generateUUID(),
      items: [],
      totalBasePrice: 0,
      totalPriceWithTax: 0,

			// Checkout info
			contactName: '',
			contactEmail: '',
			contactPhone: '',
			message: '',
			shippingAddress: '',
			deliveryType: '',
			paymentType: '',
			paymentEmail: '',
    };
    this._currentCart.next(c);
  }

	// Reset a cart after an order
	public resetCart(c: Cart): void {
		c.orderId = this.helper.generateUUID();
    c.items = [];
  	c.totalBasePrice = 0;
    c.totalPriceWithTax = 0;
		// should maintain any checkout info other than items
		this._currentCart.next(c);
	}

  // Add an item to the cart
  public addItem(item: CartItem, qty: number): void {
    let c: Cart = this._currentCart.value;
    // check if the item already exists in the cart, if so just increase qty
    let existingItem = c.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.qty = Number(existingItem.qty + qty);
    } // else add entire item to cart
    else {
      item.qty = qty;
      c.items.push(item);
    }
    this.updateCart();
  }

  // Remove an item to the cart
  public removeItem(item: CartItem): void {
    let c: Cart = this._currentCart.value;
    let existingItem = c.items.find(i => i.id === item.id);
    if (existingItem) {
      c.items = c.items.filter(i => i !== existingItem);
    }
    this.updateCart();
  }

  // Update an existing item in the cart (ie. change quantity)
  public updateItem(item: CartItem): void {
    let c: Cart = this._currentCart.value;
    let existingItem = c.items.find(i => i.id === item.id);
    console.log('updating item. old qty: ' + existingItem.qty + ', new qty: ' + item.qty);
    if (existingItem) {
      existingItem.qty = item.qty;
    }
    this.updateCart();
  }


  // Update Cart prices, etc
  private updateCart(): void {
    console.log('updating cart: ', this._currentCart.value);
    let c: Cart = this._currentCart.value;
    c.totalItems = 0;
    c.totalBasePrice = 0;
    c.items.forEach(i => {
      i.qtyPrice = i.price * i.qty;
      c.totalBasePrice += i.qtyPrice;
      c.totalItems += i.qty;
    });
    c.totalPriceWithTax = c.totalBasePrice;

    this._currentCart.next(c); // publish the update
  }


  // Testing only
  public setMockCart(c: Cart): void {
    this._currentCart.next(c);
  }



	// Submit new order (currently via email)
	// ----------------------------------------------------------------------------
	public async submitCartOrder(c: Cart): Promise<string> { 
		let result: string = 'Submitting order...';
		result = await this.helper.sendEmail(c); // result should either be 'Success' or some other error message
		return result;
	}


}
