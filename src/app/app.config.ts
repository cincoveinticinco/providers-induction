import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

/**NGRX */
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { VendorEffects } from './state/effects/vendor.effects';
import { provideState, provideStore } from '@ngrx/store';
import { vendorFeatureKey, vendorReducer } from './state/reducers/vendor.reducers';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideEffects(VendorEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }),
    provideStore(),
    provideState({name: vendorFeatureKey, reducer: vendorReducer}),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
