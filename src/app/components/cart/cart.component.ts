import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './../../models';
import { ShopService } from './../../services/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  // Properties
  cart$: Cart;
	validationError: string;
	serviceError: string;
	isProcessing = false; 

  // TODO: Probably change the full-screen hero for cart to just a thin header with no hero

  // Constructor (Dependency Injection)
  constructor(
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) { }

  // Initialization
  ngOnInit() {
    this.shopService.currentCart$.subscribe(c => this.cart$ = c);
     this.mockCart();
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
			this.serviceError = null;
			this.isProcessing = true;
			swal.fire('Order Processing...');
			// TODO: submitting spinner and success/fail alerts boxes or modals (not snackbars)
			this.shopService.submitCartOrder(this.cart$).then(result => {
				this.isProcessing = false;
				console.log('submitORder in cart component returned with the following results:  ', result);
				if (result === 'Success') { 
					swal.fire({
						title: 'Order submitted',
						text: 'Please check your email for a confirmation.',
						icon: 'success'
					});
					this.shopService.resetCart(this.cart$);
				}
				else { // ordering failed, something went wrong
					this.serviceError = result;
					swal.fire({
						title: 'Error!',
						text: 'Error submitting order: ' + this.serviceError,
						icon: 'error',
						confirmButtonText: 'Go Back'
					});
				}
			});
    }
    else {
      this.snackBar.open(this.validationError, 'Ok',
        { duration: 5000, verticalPosition: 'top' });
    }

  }

  private validateCheckout(): boolean {
    // check to make sure all fields are filled in
		console.log(this.cart$);

		this.validationError = null;
		let c = this.cart$;

		if (c.items == null || c.items.length < 1) { this.validationError = 'Your cart does not have any items in it!'; }
		
		else if (c.contactName == null || c.contactName.length < 3) { this.validationError = 'Please provide a valid contact name for the order'; }

		else if (c.contactPhone == null || c.contactPhone.length < 7) { this.validationError = 'Please provide a valid phone number for the order'; }

		else if (c.contactEmail == null || c.contactEmail.length < 5) { this.validationError = 'Please provide a valid contact email for the order'; }

		else if (c.deliveryType == null || c.deliveryType === '') { this.validationError = 'Please select a delivery type for the order'; }

		else if (c.deliveryType === 'mail' && (c.shippingAddress == null || c.shippingAddress === '') ) { this.validationError = 'Please enter a shipping address for the order'; }

		else if (c.paymentType == null || c.paymentType === '') { this.validationError = 'Please select a payment type for the order'; }

		if (this.validationError == null) { return true; }
    else { return false; }
  }





  private mockCart() {
    let c: Cart = {
      orderId: 'abcdefg',
      items: [],
      totalItems: 4,
      totalBasePrice: 22.00,
      totalPriceWithTax: 24.20

    };
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

    // this.cart$ = c;
    this.shopService.setMockCart(c);
  }

}
