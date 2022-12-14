import { Component } from '@angular/core';
import { OrderHistoryReturnBean } from 'src/app/beans/Beans';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {

  constructor(private orderHistoryService: OrderHistoryService) { }

  userEmail: string | any = sessionStorage.getItem('userEmail');
  orderDetails: [] | any = []

  ngOnInit(): void {

    this.orderHistoryService.getOrderHistory(this.userEmail).subscribe(data => {
      console.log(data)

      this.orderDetails = data.orders

    });

  }
}
