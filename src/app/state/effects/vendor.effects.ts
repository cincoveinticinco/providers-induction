import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { VendorService } from '../../services';

@Injectable()
export class VendorEffects {

  actions$ = inject(Actions);
  vendorService = inject(VendorService);

  constructor(
  ) {}

  loadVendor$ = createEffect(() => this.actions$.pipe(
    ofType('[VENDOR DATA] Load vendor'),
    exhaustMap(() => this.vendorService.getEvaluationVendor()
      .pipe(
        map(data => ({ type: '[VENDOR DATA] Loaded success', data })),
        catchError(() => EMPTY)
      ))
    )
  );
}