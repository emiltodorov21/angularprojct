import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const comparePasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password?.value === rePassword?.value) {
        return null
    } else {
        return {
            mismatch: true
        }
    }
};