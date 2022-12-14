import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent {

  constructor(private router: Router, private cartService: CartService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  totalPrice: string = "0.00"
  totalQuantity: string = "0"

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {

    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data.toFixed(2).toString();
      console.log(data);
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data.toString();
      console.log(data);
    })

  }

  logOut() {
    this.oktaAuth.signOut();
  }

}
