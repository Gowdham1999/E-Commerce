import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CountriesBean, StatesBean } from '../beans/Beans';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:8080/"

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = []
    for (let i = startMonth; i <= 12; i++) {
      data.push(i);
    }
    return of(data);
  }

  getCreditCardYear(): Observable<number[]> {

    let data: number[] = []

    let startYear = new Date().getFullYear()
    let endYear = startYear + 10

    for (let i = startYear; i <= endYear; i++) {
      data.push(i);
    }
    return of(data);
  }

  getAllCountries() {
    return this.http.get<CountriesBean[]>(`${this.apiUrl}countries`).pipe(tap((data: any) => { console.log(data) }))
  }

  getAllStates() {
    return this.http.get<StatesBean[]>(`${this.apiUrl}states`).pipe(tap((data: any) => { console.log(data) }))
  }

  getCountryStates(countryCode: string){
    return this.http.get<CountriesBean[]>(`${this.apiUrl}country?code=${countryCode}`).pipe(tap((data: any) => { console.log(data) }))
  }

}
