import { Component, inject, Input } from '@angular/core';
import { LocalStorageService, VendorService } from '../../services';
import { HeaderComponent } from '../../components/header/header.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  localStorage = inject(LocalStorageService);
  vendorService = inject(VendorService);

  @Input() token: string = '';

  ngOnInit() {
    this.localStorage.setToken(this.token);
  }

  async getVendorInfo() {
    const data = await lastValueFrom(this.vendorService.getEvaluationVendor());
    console.log(data)
  }

}
