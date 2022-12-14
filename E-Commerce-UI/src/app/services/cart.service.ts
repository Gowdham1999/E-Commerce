import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItemBean } from '../beans/Beans';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartItems: CartItemBean[] = []

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addItemToCart(cartItem: CartItemBean) {

    let existingCartItem: CartItemBean | any = undefined;
    let alreadyExistsInCart = false;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined)

    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotal();

  }

  computeCartTotal() {

    let totalPrice = 0
    let totalQuantity = 0

    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.quantity * cartItem.unitPrice
      totalQuantity += cartItem.quantity
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.debug(totalPrice, totalQuantity);
  }


  debug(totalPrice: number, totalQuantity: number) {

    console.log("Cart Contents");

    this.cartItems.forEach(cartItem => {

      const subTotlPrice = cartItem.quantity * cartItem.unitPrice
      console.log(`name: ${cartItem.name} --- quantity: ${cartItem.quantity} --- unitPrice: ${subTotlPrice}`);

    })

    console.log(`Total Price: ${totalPrice} Total Quantity: ${totalQuantity}`);

  }

  decrementQuantityFromCart(tempCartItem: CartItemBean) {

    tempCartItem.quantity--;

    if (tempCartItem.quantity === 0) {
      this.removeCartItem(tempCartItem)
    }
    else {
      this.computeCartTotal()
    }
  }

  removeCartItem(theCartItem: CartItemBean) {

    const index = this.cartItems.findIndex(tempItem => tempItem.id === theCartItem.id)

    console.log(index);


    if (index > -1) {
      this.cartItems.splice(index, 1)
      this.computeCartTotal()
    }

  }

}
