import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemBean, ProductBean } from 'src/app/beans/Beans';
import { CartService } from 'src/app/services/cart.service';
import { ProductsListService } from 'src/app/services/products-list.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(private productsListService: ProductsListService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  productsList: ProductBean[] | any = []
  products: ProductBean[] | any = []
  isCategorySelected = false

  pageNumber: number = 1
  pageSize: number = 12
  totalElements: number = 100

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
      console.log(data);

      if (data['id'] == null && data['keyword'] == null) {
        this.products = [123] //TODO DUMMY FOR FAKE LENGTH
        this.isCategorySelected = false
        this.productsListService.fetchProductsList(this.pageNumber - 1, this.pageSize).subscribe(data => {
          this.productsList = data
          this.totalElements = data.totalDataCount
        })
      }
      else if (data['keyword'] !== null && data['id'] == null) {
        this.products = [123] //TODO DUMMY FOR FAKE LENGTH
        this.isCategorySelected = false
        this.productsListService.fetchProductsFromKeyword(data['keyword'], this.pageNumber - 1, this.pageSize).subscribe((products) => {
          this.productsList = products
          this.totalElements = products.totalDataCount;
        })
      }
      else {
        this.products = [123] //TODO DUMMY FOR FAKE LENGTH

        this.isCategorySelected = true
        this.productsListService.fetchProductsFromCategory(data['id']).subscribe((products) => {
          this.productsList = products[0];
          console.log(this.productsList);

        });
      }
    })
  }

  listProductsPagination() {

    this.ngOnInit()

  }

  onSelectPageSize(pageSizeSelected: any) {

    console.log(pageSizeSelected);

    this.pageSize = pageSizeSelected
    this.pageNumber = 1
    this.ngOnInit()

  }

  addToCart(product: ProductBean) {

    const cartItem = new CartItemBean(product)

    this.cartService.addItemToCart(cartItem)

  }

}
