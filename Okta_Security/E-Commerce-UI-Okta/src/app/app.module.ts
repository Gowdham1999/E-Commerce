import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './services/interceptor.service';
import { SearchComponent } from './components/search/search.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaLoginComponent } from './components/okta-login/okta-login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';


import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import shopHubOktaConfig from './config/shop-hub-okta-config';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const oktaConfig = shopHubOktaConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    HomeComponent,
    // LoginComponent,
    SearchComponent,
    ProductCategoriesComponent,
    ProductDetailsComponent,
    CartItemsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OktaLoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    OktaAuthModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
