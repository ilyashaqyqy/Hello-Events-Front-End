import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './client/auth/register/register.component';
import { HomeComponent } from './client/home/home.component';
import { LoginComponent } from './client/auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EventDetailsComponent } from './client/events/event-details/event-details.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AdminGuard } from './gaurds/admin.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard, AdminGuard]},

  { path: '', redirectTo: '/register', pathMatch: 'full' }
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
 
];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
