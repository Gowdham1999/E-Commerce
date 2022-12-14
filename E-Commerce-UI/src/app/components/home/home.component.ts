import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryBean, ProductBean } from 'src/app/beans/Beans';
import { ProductsListService } from 'src/app/services/products-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}
