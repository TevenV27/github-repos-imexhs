import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos los servicios requeridos
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1), 
    map(user => 
      !!user ? true : router.createUrlTree(['/login'])
    )
  );
};