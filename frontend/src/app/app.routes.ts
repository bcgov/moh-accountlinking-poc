import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { authenticationGuard } from './auth/authentication.guard';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [authenticationGuard],
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirect to `home`
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
