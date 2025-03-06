import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() { }

  getFieldsErrors(control: AbstractControl): string {
    if (!control.errors) return '';
  
    const errorMessages: { [key: string]: any } = {
      required: 'Este campo es requerido',
      minlength: (errors: ValidationErrors) => `La cantida minima de caracteres es ${errors['minlength'].requiredLength}`,
      maxlength: (errors: ValidationErrors) => `La cantida máxima de caracteres es ${errors['maxlength'].requiredLength}`,
      email: 'Email no válido',
    };
  
    for (const errorKey of Object.keys(control.errors)) {
      const errorMessage = errorMessages[errorKey];
      if (errorMessage) {
        return typeof errorMessage === 'function' ? errorMessage(control.errors) : errorMessage;
      }
    }
  
    return '';
  }


}
