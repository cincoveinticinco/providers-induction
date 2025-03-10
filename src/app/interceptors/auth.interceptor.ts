import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const localStorageService = inject(LocalStorageService)

  const token = localStorageService.getToken();
  const authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json'),
  });  
  return next(authReq);

};
