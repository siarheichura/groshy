import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { ROUTER } from '@shared/enums/Router.enum'
import { markFormControlsDirty } from '@shared/helpers/form.helper'
import { FormValidators } from '@shared/validators/form-validators'
import { Registration } from '@store/user/user.actions'

interface FormValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

enum FormEnum {
  Username = 'username',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  formControls = FormEnum
  ROUTER = ROUTER
  registrationForm: FormGroup

  get formValue(): FormValue {
    return this.registrationForm.value as FormValue
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        [FormEnum.Username]: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            FormValidators.username,
          ],
        ],
        [FormEnum.Email]: ['', [Validators.required, Validators.email]],
        [FormEnum.Password]: [
          '',
          [Validators.required, FormValidators.password],
        ],
        [FormEnum.ConfirmPassword]: ['', [Validators.required]],
      },
      {
        validator: FormValidators.mustMatch(
          this.formControls.Password,
          this.formControls.ConfirmPassword,
        ),
      },
    )
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(Registration({ payload: this.formValue }))
    } else {
      markFormControlsDirty(this.registrationForm)
    }
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param])
  }
}
