import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';
import { loadVendor } from '../../../state/actions/vendor.actions';
import { lastValueFrom, Observable } from 'rxjs';
import { selectDataVendorEvaluationSST, selectDataVendorEvaluationSSTYESNOT, selectDataVendorLinkSST } from '../../../state/selectors/vendor.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VendorService } from '../../../services';

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
    link_video_sst$: Observable<any> = new Observable();
  
    constructor() {
      const form = new FormGroup({
        evaluation_sst_yes_not: new FormArray([]),
        evaluation_sst: new FormArray([])
      });
      super(form);
    }

    ngOnInit() {
      this.init();
    }

    init() {
      this.store.dispatch(loadVendor());
      this.link_video_sst$ = this.store.select(selectDataVendorLinkSST);
      this.getYesNotQuestions();
      this.getNormalQuestions();
    }

    getYesNotQuestions() {
      this.evaluation_sst_yes_not$ = this.store.select(selectDataVendorEvaluationSSTYESNOT);
      this.store.select(selectDataVendorEvaluationSSTYESNOT)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evaluations => {
          if (this.getFormArray('evaluation_sst_yes_not').controls.length === 0 ) {
            evaluations?.forEach(() => {
              this.getFormArray('evaluation_sst_yes_not').push(this.createControl());
            });
          }
        });
    }

    getNormalQuestions() {
      this.evaluation_sst$ = this.store.select(selectDataVendorEvaluationSST);
      this.store.select(selectDataVendorEvaluationSST)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evaluations => {
          if (this.getFormArray('evaluation_sst').controls.length === 0 ) {
            evaluations?.forEach(() => {
              this.getFormArray('evaluation_sst').push(this.createControl());
            });
          }
        });
    }
  
    async submit() {
      this.loading = true;
      if (this.parentForm.invalid) {
        this.parentForm.markAllAsTouched();
        return;
      }
      this.localStorageService.setInfo(this.parentForm.getRawValue());
      await lastValueFrom(this.vendorService.save_response_evaluation(this.localStorageService.getInfo()));
      this.loading = false;
      this.navigateTo('thanks');
    }

}
