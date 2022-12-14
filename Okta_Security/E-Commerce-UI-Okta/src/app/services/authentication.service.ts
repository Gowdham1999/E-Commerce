// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor(private http: HttpClient, private router: Router) { }

//   authUrl = 'http://localhost:8080/auth'

//   isAuthenticated(userName: string, password: string) {

//     let encodedString = 'Basic ' + (window.btoa(userName + ':' + password))

//     let headers = new HttpHeaders({
//       Authorization: encodedString
//     })

//     return this.http.get<Authentication>(this.authUrl, { headers }).pipe(
//       map(data => {
//         sessionStorage.setItem('userName', userName)
//         sessionStorage.setItem('token', encodedString)

//         return data;
//       }
//       ))

//   }

//   getAuthenticatedUserName() {
//     return sessionStorage.getItem('userName')
//   }

//   getAuthenticatedToken() {
//     return sessionStorage.getItem('token')
//   }

//   onLogout() {
//     this.router.navigate(['login'])
//     sessionStorage.removeItem('userName')
//     sessionStorage.removeItem('token')
//   }

// }

// export class Authentication {

//   constructor(public message: string) { }

// }