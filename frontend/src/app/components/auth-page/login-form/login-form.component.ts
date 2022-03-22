import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormControlErrors } from './../../../shared/enums/FormControlErrors.enum';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';
import { Login } from 'src/app/store/user/user.actions';

interface FormValue {
  email: string;
  password: string;
}

enum FormEnum {
  Email = 'email',
  Password = 'password',
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  formControls = FormEnum;
  routes = RouterEnum;
  controlErrors = FormControlErrors;

  loginForm: FormGroup;

  get formValue(): FormValue {
    return this.loginForm.value as FormValue;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [this.formControls.Email]: ['chura14@yandex.ru', [Validators.required]],
      [this.formControls.Password]: ['Zxcvbn12', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(Login({ payload: this.formValue }));
    } else {
      markFormControlsDirty(this.loginForm);
    }
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([RouterEnum.Auth, param]);
  }
}
