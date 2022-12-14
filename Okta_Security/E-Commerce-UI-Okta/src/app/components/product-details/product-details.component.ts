import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemBean, ProductBean } from 'src/app/beans/Beans';
import { CartService } from 'src/app/services/cart.service';
import { ProductsListService } from 'src/app/services/products-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productsListService: ProductsListService, 
    private cartService: CartService,
    private activatedRoute: ActivatedRoute) { }

  product: ProductBean | any

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {

      console.log(data);

      this.productsListService.fetchProductDetails(data['id']).subscribe(data => this.product = data);

    }
    )
  }

  addToCart(product: ProductBean) {

    const cartItem = new CartItemBean(product)

    this.cartService.addItemToCart(cartItem)

  }

}
