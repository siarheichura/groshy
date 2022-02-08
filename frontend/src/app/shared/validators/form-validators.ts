import { AbstractControl } from '@angular/forms';

const forbiddenUsernameChars = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?А-Яа-я]/;

export class FormValidators {
  static username(control: AbstractControl) {
    const minLength = control.value.length > 3;
    const validChars = !forbiddenUsernameChars.test(control.value);
    const isValid = minLength && validChars;

    if (!isValid) {
      return { invalidUsername: true };
    }

    return null;
  }

  static password(control: AbstractControl) {
    const hasNumber = /\d/.test(control.value);
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const minLength = control.value.length > 8;
    const isValid = hasNumber && hasUpperCase && hasLowerCase && minLength;

    if (!isValid) {
      return { invalidPassword: true };
    }
    return null;
  }
}
