import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';
import { loadVendor } from '../../../state/actions/vendor.actions';
import { Observable } from 'rxjs';
import { selectDataVendorEvaluationSST, selectDataVendorEvaluationSSTYESNOT } from '../../../state/selectors/vendor.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sst-form',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sst-form.component.html',
  styleUrl: './sst-form.component.scss'
})
export class SstFormComponent extends BaseForm {

    evaluation_sst_yes_not$: Observable<any> = new Observable();
    evaluation_sst$: Observable<any> = new Observable();
  
    constructor() {
      const form = new FormGroup({
        questions_yes_not: new FormArray([]),
        questions: new FormArray([])
      });
      super(form);
    }

    ngOnInit() {
      this.init();
    }

    init() {
      this.store.dispatch(loadVendor());
      this.getYesNotQuestions();
      this.getNormalQuestions();
    }

    getYesNotQuestions() {
      this.evaluation_sst_yes_not$ = this.store.select(selectDataVendorEvaluationSSTYESNOT);
      this.store.select(selectDataVendorEvaluationSSTYESNOT)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evaluations => {
          console.log(evaluations)
          evaluations?.forEach(() => {
            this.getFormArray('questions_yes_not').push(this.createControl());
          });
        });
    }

    getNormalQuestions() {
      this.evaluation_sst$ = this.store.select(selectDataVendorEvaluationSST);
      this.store.select(selectDataVendorEvaluationSST)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evaluations => {
          evaluations?.forEach(() => {
            this.getFormArray('questions').push(this.createControl());
          });
        });
    }
  
    submit() {
      console.log(this.parentForm.getRawValue());
      if (this.parentForm.invalid) {
        this.parentForm.markAllAsTouched();
        return;
      }
      this.localStorageService.setInfo(this.parentForm.getRawValue());
    }

}
