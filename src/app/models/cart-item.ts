// -------------------------------------------------
// Cart Item model
// Interface for all items purchasable in the shop
// -------------------------------------------------
export interface CartItem {

    id: number;             // unique number for identification
    image: string;          // file name of the image to display
    name: string;           // All spinners must have a name!
    description: string;    // Item description text
    price: number;          // decimal price

    qty?: number;           // How many of this item are in the shopping cart
    qtyPrice?: number;      // Price * Qty
}
