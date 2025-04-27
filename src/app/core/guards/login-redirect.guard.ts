import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const loginRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const username = auth.getGitHubUsername();
  if (username) {
    router.navigate(['/user', username]);
    return false;
  }
  return true;
};
