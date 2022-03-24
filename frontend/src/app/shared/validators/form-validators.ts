import { AbstractControl, FormGroup } from '@angular/forms';

const forbiddenUsernameChars = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?А-Яа-я]/;

export class FormValidators {
  static username(control: AbstractControl) {
    const validChars = !forbiddenUsernameChars.test(control.value);

    if (!validChars) {
      return { invalidUsername: true };
    }

    return null;
  }

  static password(control: AbstractControl) {
    const hasNumber = /\d/.test(control.value);
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const isValid = hasNumber && hasUpperCase && hasLowerCase;

    if (!isValid) {
      return { invalidPassword: true };
    }
    return null;
  }

  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): void => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
