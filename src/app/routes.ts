import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ReposListComponent } from './features/repos/repos-list/repos-list.component';
import { UserReposComponent } from './features/repos/user-repos/user-repos.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'repos', component: ReposListComponent, canActivate: [authGuard] },
  { path: 'user/:username', component: UserReposComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'repos', pathMatch: 'full' },
  { path: '**', redirectTo: 'repos' },
];