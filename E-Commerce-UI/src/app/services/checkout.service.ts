import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { PurchaseOrderBean } from '../beans/Beans';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }


  checkoutApi = "http://localhost:8080/purchase"

  placeOrder(purchase: PurchaseOrderBean) {


    let inputJSON = {

      "customer": {
        "firstName": purchase.customer.firstName,
        "lastName": purchase.customer.lastName,
        "email": purchase.customer.email,
        "mobileNumber": purchase.customer.mobileNumber
      },
      "shippingAddress": {
        "street": purchase.shippingAddress.street,
        "city": purchase.shippingAddress.city,
        "state": purchase.shippingAddress.state,
        "country": purchase.shippingAddress.country,
        "zipCode": purchase.shippingAddress.zipCode
      },
      "order": {
        "totalPrice": purchase.order.totalPrice,
        "totalQuantity": purchase.order.totalQuantity
      },
      "orderItems": purchase.orderItems
    }

    console.log(inputJSON)

    return this.http.post<PurchaseOrderBean>(this.checkoutApi, inputJSON).pipe(tap((data: any) => { console.log(data) }))

  }


}
