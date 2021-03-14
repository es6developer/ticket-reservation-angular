import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './core/services/api.service';
import { AuthService } from './core/services/auth.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/train/home/home.component';
import { TrainListComponent } from './components/train/train-list/train-list.component';
import { TrainSeatComponent } from './components/train/train-seat/train-seat.component';
import { TrainBookingSuccessComponent } from './components/train/train-booking-success/train-booking-success.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { ActivitiesComponent } from './components/user/activities/activities.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TrainListComponent,
    TrainSeatComponent,
    TrainBookingSuccessComponent,
    ProfileComponent,
    NavbarComponent,
    ActivitiesComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [ApiService, AuthService, AuthGuardService, DatePipe, TimeAgoPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
