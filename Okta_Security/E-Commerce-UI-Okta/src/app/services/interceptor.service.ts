import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handleAccress(req, next))
  }

  private async handleAccress(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const secureEndpoint = [environment.shopHubSecuredBcUrl+"orders/orderhistory"]

    if (secureEndpoint.some(url => req.urlWithParams.includes(url))) {
      const accessToken = this.oktaAuth.getAccessToken()
      req = req.clone({
        setHeaders:
        {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return await lastValueFrom(next.handle(req))
  }

}
