import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as authGuard } from './auth-guard/auth-guard.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/train/home/home.component';
import { TrainBookingSuccessComponent } from './components/train/train-booking-success/train-booking-success.component';
import { TrainListComponent } from './components/train/train-list/train-list.component';
import { TrainSeatComponent } from './components/train/train-seat/train-seat.component';
import { ActivitiesComponent } from './components/user/activities/activities.component';
import { ProfileComponent } from './components/user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/train', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'home/train', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'home/train/list',
    component: TrainListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/train/seat-availability',
    component: TrainSeatComponent,
    canActivate: [authGuard],
  },
  {
    path: 'success',
    component: TrainBookingSuccessComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/activities',
    component: ActivitiesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
