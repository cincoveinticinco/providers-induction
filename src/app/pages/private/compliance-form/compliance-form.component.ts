import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { lastValueFrom, Observable } from 'rxjs';
import { HeaderComponent } from '../../../components/header/header.component';
import { BaseForm } from '../../../bases/form.base';
import { loadVendor } from '../../../state/actions/vendor.actions';
import { selectDataVendor, selectDataVendorEvaluationCompliance, selectDataVendorLinkCompliance } from '../../../state/selectors/vendor.selectors';

@Component({
  selector: 'app-compliance-form',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './compliance-form.component.html',
  styleUrl: './compliance-form.component.scss'
})
export class ComplianceFormComponent extends BaseForm {

  evaluation_compliances$: Observable<any> = new Observable();
  link_video_compliance$: Observable<any> = new Observable();
  hasSSTQuestions = true;
  
  constructor() {
    const form = new FormGroup({
      evaluation_compliances: new FormArray([])
    });
    super(form);
  }

  ngOnInit() {
    this.store.dispatch(loadVendor());
    this.init();
    this.validateInformation();
  }
  
  init() {
    this.evaluation_compliances$ = this.store.select(selectDataVendorEvaluationCompliance);
    this.link_video_compliance$ = this.store.select(selectDataVendorLinkCompliance);
    this.evaluation_compliances$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evaluations => {
        if (this.getFormArray('evaluation_compliances').controls.length === 0 ) {
          evaluations?.forEach(() => {
            this.getFormArray('evaluation_compliances').push(this.createControl());
          });
        }
      });
  }

  validateInformation() {
    this.store.select(selectDataVendor)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      if (data.evaluation_sst?.length === 0 && data.evaluation_sst_yes_not?.length === 0) {
        this.hasSSTQuestions = false;
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

    if(this.hasSSTQuestions) {
      this.navigateTo('sst-form');
    } else {
      await lastValueFrom(this.vendorService.save_response_evaluation(this.localStorageService.getInfo()));
      this.navigateTo('thanks');
    }
    this.loading = false;

  }

}
