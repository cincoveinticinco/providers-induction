import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';
import { selectDataVendorInfo } from '../../../state/selectors/vendor.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadVendor } from '../../../state/actions/vendor.actions';

@Component({
  selector: 'app-info-form',
  imports: [MaterialModule, HeaderComponent, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './info-form.component.html',
  styleUrl: './info-form.component.scss'
})
export class InfoFormComponent extends BaseForm {

  constructor() {
    const form = new FormGroup({
      name: new FormControl('', Validators.required),
      document_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      project_name: new FormControl('', Validators.required),
      project_position: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
    super(form);
  }

  ngOnInit() {
    this.store.dispatch(loadVendor());
    this.setForm();
  }

  setForm() {
    this.store.select(selectDataVendorInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(vendor => {
        this.getControl('name').patchValue(vendor?.name);
        this.getControl('document_number').patchValue(vendor?.document);
        this.getControl('email').patchValue(vendor?.email);
        this.getControl('phone').patchValue(vendor?.telephone);
        this.getControl('project_name').patchValue(vendor?.project_name);
        this.getControl('project_position').patchValue(vendor?.position);
        this.getControl('company').patchValue(vendor?.company_name);
        this.getControl('date').patchValue(new Date().toISOString().substring(0, 10));
        this.parentForm.disable();
      });
  }

  submit() {
    console.log(this.parentForm.getRawValue());
    if (this.parentForm.invalid) {
      this.parentForm.markAllAsTouched();
      return;
    }
    this.localStorageService.setInfo(this.parentForm.getRawValue());
    this.router.navigate(['compliance-form']);
  }

}
