import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'home', redirectTo: '/home/products', pathMatch: 'full' },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService], children:
    [
        { path: 'products/cart/checkout', component: CheckoutComponent },
        
        { path: 'products/cart', component: CartDetailsComponent },
        
        { path: 'products/:id', component: ProductDetailsComponent },

        { path: 'products', component: ProductsListComponent },

        { path: 'category/:id', component: ProductsListComponent },

        { path: 'search/:keyword', component: ProductsListComponent },

      ]
  },



  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
