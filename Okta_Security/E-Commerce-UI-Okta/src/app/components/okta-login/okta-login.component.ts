import { Component, Inject } from '@angular/core';


// TODO Okta Configurations
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import OktaSignIn from '@okta/okta-signin-widget';
import shopHubOktaConfig from 'src/app/config/shop-hub-okta-config';

@Component({
  selector: 'app-okta-login',
  templateUrl: './okta-login.component.html',
  styleUrls: ['./okta-login.component.scss']
})
export class OktaLoginComponent {


  oktaSignIn: any

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignIn = new OktaSignIn({

      logo: 'assets/images/SHOP.png',
      baseUrl: shopHubOktaConfig.oidc.issuer.split('/oauth2')[0],
      clientId: shopHubOktaConfig.oidc.clientId,
      redirectUri: shopHubOktaConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: shopHubOktaConfig.oidc.issuer,
        scope: shopHubOktaConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {

    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl(

      { el: '#okta-sign-in-widget' },
      (response: any) => {
        if (response.status === "SUCCESS") {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw new error;
      }
    )
  }

}
