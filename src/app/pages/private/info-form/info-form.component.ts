import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../bases/form.base';

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
