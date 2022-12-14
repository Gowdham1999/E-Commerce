import { Component } from '@angular/core';
import { CartItemBean } from 'src/app/beans/Beans';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {

  constructor(private cartService: CartService) { }

  cartItems: CartItemBean[] = [];

  totalPrice: number = 0.00;
  totalQuantity: number = 0

  ngOnInit(): void {

    this.cartItems = this.cartService.cartItems
    
    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice)
    
    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity)
    
    this.cartService.computeCartTotal()

  }

  incrementQuantity(tempCartItem: CartItemBean) {

    this.cartService.addItemToCart(tempCartItem)

  }

  decrementQuantity(tempCartItem: CartItemBean) {

    this.cartService.decrementQuantityFromCart(tempCartItem)

  }

  removeItem(tempCartItem: CartItemBean) {

    console.log("Remove Button:");
    console.log(tempCartItem);

    this.cartService.removeCartItem(tempCartItem)

  }


}
