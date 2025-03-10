import { Injectable } from '@angular/core';
import { ApiBase } from '../bases/api.base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends ApiBase {

  constructor() {
    super();
  }

  getEvaluationVendor() {
    return this.get(`${this.environment.apiUrl}finance_manager/getEvaluationVendor`, {});
  }

}
