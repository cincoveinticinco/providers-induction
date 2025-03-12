import { Component, DestroyRef, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Router } from '@angular/router';
import { loadVendor } from '../../state/actions/vendor.actions';
import { Store } from '@ngrx/store';
import { selectDataVendor } from '../../state/selectors/vendor.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  localStorage = inject(LocalStorageService);
  router = inject(Router);
  store = inject(Store<any>);
  destroyRef = inject(DestroyRef);

  @Input() token: string = '';

  constructor() {}

  ngOnInit() {
    this.localStorage.setToken(this.token);
    this.verifyInformation();
  }

  verifyInformation() {
    this.store.dispatch(loadVendor());
    this.store.select(selectDataVendor)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (data.evaluation_compliances?.length === 0 && data.evaluation_sst?.length === 0 && data.evaluation_sst_yes_not?.length === 0) {
          this.router.navigate(['thanks'])
        }
      })
  }

  getVendorInfo() {
    this.router.navigate(['info-form']);
  }

}
