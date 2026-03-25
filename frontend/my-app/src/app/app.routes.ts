import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { UserComponent } from './admin/user/user.component';
 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ DEFAULT ROUTE
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
   { path: 'orders', component: OrderComponent },
   { path: 'profile', component: ProfileComponent },
     { path: 'admin/orders', component: OrderManagementComponent },
      { path: 'admin/user', component: UserComponent }
];
