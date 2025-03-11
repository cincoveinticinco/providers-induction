import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Store } from '@ngrx/store';
import { loadVendor } from '../../state/actions/vendor.actions';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  localStorage = inject(LocalStorageService);

  @Input() token: string = '';

  constructor(
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.localStorage.setToken(this.token);
  }

  getVendorInfo() {
    this.store.dispatch(loadVendor());
  }

}
