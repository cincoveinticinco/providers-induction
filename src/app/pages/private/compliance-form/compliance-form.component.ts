import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../../components/header/header.component';
import { BaseForm } from '../../../bases/form.base';
import { loadVendor } from '../../../state/actions/vendor.actions';
import { selectDataVendorEvaluationCompliance } from '../../../state/selectors/vendor.selectors';

@Component({
  selector: 'app-compliance-form',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './compliance-form.component.html',
  styleUrl: './compliance-form.component.scss'
})
export class ComplianceFormComponent extends BaseForm {

  evaluation_compliances$: Observable<any> = new Observable();
  
  constructor() {
    const form = new FormGroup({
      evaluation_compliances: new FormArray([])
    });
    super(form);
  }

  ngOnInit() {
    this.store.dispatch(loadVendor());
    this.init();
  }
  
  init() {
    this.evaluation_compliances$ = this.store.select(selectDataVendorEvaluationCompliance);
    this.evaluation_compliances$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evaluations => {
        if (this.getFormArray('evaluation_compliances').controls.length === 0 ) {
          evaluations?.forEach(() => {
            this.getFormArray('evaluation_compliances').push(this.createControl());
          });
          console.log(this.parentForm)
        }
      });
  }

  submit() {
    console.log(this.parentForm)
    if (this.parentForm.invalid) {
      this.parentForm.markAllAsTouched();
      return;
    }
    this.localStorageService.setInfo(this.parentForm.getRawValue());
    this.router.navigate(['sst-form']);
  }

}
