import { AbstractControl, FormGroup } from '@angular/forms'

export const markFormControlsDirty = (form: FormGroup) => {
  if (!form.controls) {
    return
  }

  Object.values(form.controls).forEach(
    (control: AbstractControl | FormGroup) => {
      if (control instanceof FormGroup) {
        markFormControlsDirty(control)
      }

      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity()
      }
    },
  )
}
