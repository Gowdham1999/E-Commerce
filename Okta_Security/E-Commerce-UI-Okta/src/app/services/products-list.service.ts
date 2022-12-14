import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { CategoryBean, ProductBean, ProductReturnType } from '../beans/Beans';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  constructor(private http: HttpClient) { }

  productFromCategories = new Subject<ProductBean[]>()
  categorySelected = false


  apiUrl = environment.shopHubSecuredBcUrl

  //! Product Category Repository Below

  fetchCategories() {

    return this.http.get<CategoryBean[]>(`${this.apiUrl}categories?pageNumber=0&pageSize=10000`).pipe(tap((data: any) => { console.log(data) }))

  }

  fetchProductsFromCategory(id: number) {

    return this.http.get<ProductBean[] | any>(`${this.apiUrl}categories/${id}/products?pageNumber=0&pageSize=10000`).pipe(tap((data) => { console.log(data) }))

  }

  //! Product Repository Below

  fetchProductsList(pageNumber: number, pageSize: number) {

    return this.http.get<ProductReturnType>(`${this.apiUrl}products?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(tap((data) => { console.log(data) }))

  }

  fetchProductsFromKeyword(keyword: string, pageNumber: number, pageSize: number) {

    return this.http.get<ProductBean[] | any>(`${this.apiUrl}search/${keyword}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(tap((data) => { console.log(data) }))

  }

  fetchProductDetails(id: number) {

    return this.http.get<ProductBean>(`${this.apiUrl}products/${id}`).pipe(tap((data) => { console.log(data) }))

  }


}
