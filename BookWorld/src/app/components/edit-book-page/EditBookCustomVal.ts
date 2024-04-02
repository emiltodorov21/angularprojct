import { AbstractControl } from "@angular/forms";

export function trimValidator(control: AbstractControl) {
    const controlValue = control.value;
    if (controlValue.trim().length === 0) {
       return { 
        trimValidator: true,
       }
    }

    return null;

}

export function minusValidator(control: AbstractControl) {
    const controlValue = control.value;
    if (controlValue < 0 ) {
       return {
        minusValidator: true,
       } 
    }
    return null;
}