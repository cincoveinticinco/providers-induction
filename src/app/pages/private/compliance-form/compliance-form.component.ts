import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compliance-form',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './compliance-form.component.html',
  styleUrl: './compliance-form.component.scss'
})
export class ComplianceFormComponent {

    form: FormGroup;
  
    constructor() {
      this.form = new FormGroup({
        conflicts: new FormControl('', Validators.required),
        asset_laundering: new FormControl('', Validators.required),
        extortion: new FormControl('', [Validators.required, Validators.email]),
        bribery: new FormControl('', Validators.required),
        data_processing: new FormControl('', Validators.required)
      })
    }
  
    submit() {
      console.log(this.form.getRawValue());
    }

}
