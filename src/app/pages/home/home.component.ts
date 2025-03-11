import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  localStorage = inject(LocalStorageService);
  router = inject(Router);

  @Input() token: string = '';

  constructor() {}

  ngOnInit() {
    this.localStorage.setToken(this.token);
  }

  getVendorInfo() {
    this.router.navigate(['info-form']);
  }

}
