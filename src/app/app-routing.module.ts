import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './client/auth/register/register.component';
import { HomeComponent } from './client/home/home.component';
import { LoginComponent } from './client/auth/login/login.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component:HomeComponent },

  { path: '', redirectTo: '/register', pathMatch: 'full' }
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
 
];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
