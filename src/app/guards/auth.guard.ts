import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services';

export const authGuard: CanActivateFn = () => {

  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (!localStorageService.getToken()) {
    router.navigate(['not-found']);
    return false;
  }

  return true;
};
