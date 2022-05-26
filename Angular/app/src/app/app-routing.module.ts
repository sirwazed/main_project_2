import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: "full"},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data:{role: 'Admin'}},
  {path: 'my-cart', component: CartComponent, canActivate: [AuthGuard], data:{role:['User', 'Admin']}},
  {path: 'forbidden', component: ForbiddenComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
