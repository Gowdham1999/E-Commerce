import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistoryReturnBean } from '../beans/Beans';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private http: HttpClient) { }


  order_history_api_url = environment.shopHubSecuredBcUrl+'orders/orderhistory'

  getOrderHistory(email: string) {

    console.log(`${this.order_history_api_url}?email=${email}&pageNumber=0&pageSize=10`);


    return this.http.get<OrderHistoryReturnBean>(`${this.order_history_api_url}?email=${email}&pageNumber=0&pageSize=10`)

  }


}
