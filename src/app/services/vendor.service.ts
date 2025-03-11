import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getEvaluationVendor(): Observable<any> {
    return this.get(`finance_manager/getEvaluationVendor`, {});
  }

}
