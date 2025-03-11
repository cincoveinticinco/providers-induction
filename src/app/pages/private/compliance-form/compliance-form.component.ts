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
        questions: new FormArray([])
      });
      super(form);
    }

    ngOnInit() {
      this.init();
    }
    
    init() {
      this.store.dispatch(loadVendor());
      this.evaluation_compliances$ = this.store.select(selectDataVendorEvaluationCompliance);
      this.store.select(selectDataVendorEvaluationCompliance)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evaluations => {
          console.log(evaluations)
          evaluations?.forEach(() => {
            this.getFormArray('questions').push(this.createControl());
          });
        });
    }
  
    submit() {
      console.log(this.parentForm.getRawValue());
      console.log(this.getFormArray('questions').controls[0]);
      if (this.parentForm.invalid) {
        this.parentForm.markAllAsTouched();
        return;
      }
      this.localStorageService.setInfo(this.parentForm.getRawValue());
      this.router.navigate(['sst-form']);
    }

}
