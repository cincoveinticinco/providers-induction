import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';

@Component({
  selector: 'app-sst-form',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sst-form.component.html',
  styleUrl: './sst-form.component.scss'
})
export class SstFormComponent extends BaseForm {
  
    constructor() {
      const form = new FormGroup({
        security_general: new FormControl('', Validators.required),
        sst_requirementes: new FormControl('', Validators.required),
        emergency_prevention: new FormControl('', Validators.required),
        prevention_accidents: new FormControl('', Validators.required),
        no_work_accident: new FormControl('', Validators.required),
        work_dangers: new FormControl('', Validators.required),
        unsafe_act: new FormControl('', Validators.required),
        sst_responsabilities: new FormControl('', Validators.required),
        when_is_work_accident: new FormControl('', Validators.required),
      });
      super(form);
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
