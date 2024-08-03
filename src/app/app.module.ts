import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountManagementComponent } from './admin/account-management/account-management.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EventManagementComponent } from './admin/event-management/event-management.component';
import { ContactRequestsComponent } from './admin/contact-requests/contact-requests.component';
import { HomeComponent } from './client/home/home.component';
import { AboutComponent } from './client/about/about.component';
import { LoginComponent } from './client/auth/login/login.component';
import { RegisterComponent } from './client/auth/register/register.component';
import { ProfileComponent } from './client/auth/profile/profile.component';
import { EventListComponent } from './client/events/event-list/event-list.component';
import { EventDetailsComponent } from './client/events/event-details/event-details.component';
import { EventBookingComponent } from './client/events/event-booking/event-booking.component';
import { ContactComponent } from './client/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountManagementComponent,
    DashboardComponent,
    EventManagementComponent,
    ContactRequestsComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EventListComponent,
    EventDetailsComponent,
    EventBookingComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
