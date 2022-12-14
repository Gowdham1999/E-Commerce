import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryBean, ProductBean } from 'src/app/beans/Beans';
import { ProductsListService } from 'src/app/services/products-list.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  constructor(private productsListService: ProductsListService, private router: Router) { }

  categories: CategoryBean[] | any = [];
  productFromCategories: ProductBean[] | any = [];

  ngOnInit(): void {

    this.categories = this.productsListService.fetchCategories();

  }
}
