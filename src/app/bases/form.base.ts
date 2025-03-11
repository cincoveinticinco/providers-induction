import { AbstractControl, FormGroup } from "@angular/forms"
import { FormErrorService, LocalStorageService } from "../services";
import { DestroyRef, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

export class BaseForm {

    parentForm: FormGroup;
    router = inject(Router);
    formErrorService = inject(FormErrorService);
    localStorageService = inject(LocalStorageService);
    store = inject(Store<any>);
    destroyRef = inject(DestroyRef);

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

    navigateTo(url: string) {
        this.router.navigate([url]);
    }

}