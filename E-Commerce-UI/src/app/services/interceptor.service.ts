import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let userName = this.authenticationService.getAuthenticatedUserName()
    let token = this.authenticationService.getAuthenticatedToken()


    if (userName && token) {

      req = req.clone({
        setHeaders:
        {
          Authorization: token
        }
      });

    }

    return next.handle(req)

  }

}
