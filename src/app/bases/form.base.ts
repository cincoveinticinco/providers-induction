import { AbstractControl, FormGroup } from "@angular/forms"
import { FormErrorService } from "../services/form-error.service";
import { inject } from "@angular/core";

export class BaseForm {

    parentForm: FormGroup;
    formErrorService = inject(FormErrorService)

    constructor(form: FormGroup) {
        this.parentForm = form;
    }

    getControl(name: string): AbstractControl {
        return this.parentForm.get(name)!;
    }

    getErrorLabel(control: AbstractControl): string {
        return this.formErrorService.getFieldsErrors(control);
    }

    hasErrors(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

}