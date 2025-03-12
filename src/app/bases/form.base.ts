import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms"
import { FormErrorService, LocalStorageService, VendorService } from "../services";
import { DestroyRef, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

export class BaseForm {

    parentForm: FormGroup;
    router = inject(Router);
    formErrorService = inject(FormErrorService);
    localStorageService = inject(LocalStorageService);
    vendorService = inject(VendorService);
    store = inject(Store<any>);
    destroyRef = inject(DestroyRef);

    constructor(form: FormGroup) {
        this.parentForm = form;
    }

    getControl(name: string): AbstractControl {
        return this.parentForm.get(name)!;
    }

    getFormArray(name: string): FormArray {
        return this.parentForm.get(name)! as FormArray;
    }

    getErrorLabel(control: AbstractControl): string {
        return this.formErrorService.getFieldsErrors(control);
    }

    hasErrors(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

    navigateTo(url: string) {
        this.router.navigate([url]);
    }

    createControl(): FormControl {
        return new FormControl('', Validators.required)
    }

    passNumberToLetter(i: number) {
        return String.fromCharCode(65 + i);
    }

}