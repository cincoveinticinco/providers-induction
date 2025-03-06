import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';

@Component({
  selector: 'app-compliance-form',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './compliance-form.component.html',
  styleUrl: './compliance-form.component.scss'
})
export class ComplianceFormComponent extends BaseForm {
  
    constructor() {
      const form = new FormGroup({
        conflicts: new FormControl('', Validators.required),
        asset_laundering: new FormControl('', Validators.required),
        extortion: new FormControl('', Validators.required),
        bribery: new FormControl('', Validators.required),
        data_processing: new FormControl('', Validators.required)
      });
      super(form);
    }
  
    submit() {
      console.log(this.parentForm.getRawValue());
      if (this.parentForm.invalid) {
        this.parentForm.markAllAsTouched();
        return;
      }
    }

}
