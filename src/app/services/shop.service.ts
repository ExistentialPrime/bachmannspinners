import { Injectable } from '@angular/core';
import { Cart, CartItem } from './../models'
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
  private _currentCart = new BehaviorSubject<Cart>(null);
  public currentCart$ = this._currentCart.asObservable().pipe(filter(Boolean), distinctUntilChanged()); // ignore null values


  // Constructor (Dependency Injection and Setup)
  constructor(
    private helper: HelperService,
  ) {
    this.generateNewCart(); 
  }

  // Grab our list of items in the shop
  public getAllShopItems(): CartItem[] {
    return ALLSHOPITEMS;
  }

  // Create a new shopping cart
  public generateNewCart(): void {
    let c = {
      orderId: this.helper.generateUUID(),
      items: [],
      totalBasePrice: 0,
      totalPriceWithTax: 0,
    };
    this._currentCart.next(c);
  }

  // Add an item to the cart
  public addItem(item: CartItem, qty: number): void { 
    let c = this._currentCart.value;
    // check if the item already exists in the cart, if so just increase qty
    let existingItem = c.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.qty += qty;
      existingItem.qtyPrice = existingItem.price * existingItem.qty;
    } // else add entire item to cart
    else {
      item.qty = qty;
      item.qtyPrice = item.price * item.qty;
      c.items.push(item);
    }
    this.updateCart();
  }

  // Update Cart prices, etc
  private updateCart(): void {
    let c = this._currentCart.value;

    let total: number = 0;
    c.items.forEach(i => { total += Number(i.qtyPrice) })
    c.totalBasePrice = total;
    c.totalPriceWithTax = c.totalBasePrice;

    this._currentCart.next(c); // publish the update
  }

}
