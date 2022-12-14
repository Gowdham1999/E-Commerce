import { Component, Inject } from '@angular/core';

// TODO Okta Configurations
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent {

  isAuthenticated = false;
  userFullName = ''
  userEmail = ''

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (res: any) => {
        this.isAuthenticated = res.isAuthenticated
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(data => {
        this.userFullName = data.name as string;
        this.userEmail = data.email as string;

        sessionStorage.setItem('userEmail', this.userEmail);

      })
    }
  }

  logOut() {
    this.oktaAuth.signOut();
  }


}
