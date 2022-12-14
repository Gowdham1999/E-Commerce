import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { OktaLoginComponent } from './components/okta-login/okta-login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';


function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [

  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: OktaLoginComponent },

  { path: 'home', redirectTo: '/home/products', pathMatch: 'full' },

  {
    path: 'home', component: HomeComponent, children:
      [
        { path: 'products/cart/checkout', component: CheckoutComponent },

        { path: 'products/cart', component: CartDetailsComponent },

        { path: 'products/:id', component: ProductDetailsComponent },

        { path: 'products', component: ProductsListComponent },

        { path: 'category/:id', component: ProductsListComponent },

        { path: 'search/:keyword', component: ProductsListComponent },

        { path: 'orders/order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired: sendToLoginPage } },

      ]
  },

  { path: '', redirectTo: '/home/products', pathMatch: 'full' },

  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
