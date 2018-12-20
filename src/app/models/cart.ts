// -------------------------------------------------
// Cart model
// A basic shopping Cart implementation
// -------------------------------------------------
import { CartItem } from './cart-item';
export interface Cart {
    orderId: string;            // GUID for unique identification
    items?: CartItem[];         // All the items in the cart
    totalItems?: number;        // Total number of items in the cart
    totalBasePrice?: number;    // cost of all the items in the cart
    totalPriceWithTax?: number; // Total price with tax included

    // Checkout info
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    message?: string;
    shippingAddress?: string;
    deliveryType?: string;
    paymentType?: string;
    paymentEmail?: string;      // IE. for paypal
}



