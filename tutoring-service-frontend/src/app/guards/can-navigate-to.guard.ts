import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {inject} from '@angular/core';

export const canNavigateToUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isTutor()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
