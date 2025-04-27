import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { UserReposComponent } from './features/repos/user-repos/user-repos.component';
import { authGuard } from './core/guards/auth.guard';
import { loginRedirectGuard } from './core/guards/login-redirect.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: 'user/:username', component: UserReposComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
