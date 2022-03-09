import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';
import { FormValidators } from './../../../shared/validators/form-validators';
import { Registration } from './../../../store/user/user.actions';

interface FormValue {
  username: string;
  email: string;
  password: string;
}

enum FormEnum {
  Username = 'username',
  Email = 'email',
  Password = 'password',
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  formControls = FormEnum;
  routes = RouterEnum;
  registrationForm: FormGroup;

  get formValue(): FormValue {
    return this.registrationForm.value as FormValue;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      [FormEnum.Username]: [
        '',
        [Validators.required, Validators.minLength(3), FormValidators.username],
      ],
      [FormEnum.Email]: ['', [Validators.required, Validators.email]],
      [FormEnum.Password]: ['', [Validators.required, FormValidators.password]],
    });
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(Registration({ payload: this.formValue }));
    } else {
      markFormControlsDirty(this.registrationForm);
    }
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }
}
