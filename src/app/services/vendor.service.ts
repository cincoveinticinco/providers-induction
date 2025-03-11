import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Evaluation } from '../interface/vendor.interface';

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

  save_response_evaluation(data: { evaluation_compliances: Evaluation[], evaluation_sst: Evaluation[], evaluation_sst_yes_not: Evaluation[] }): Observable<any> {
    return this.post(`finance_manager/save_response_evaluation`, data, {});
  }

}
