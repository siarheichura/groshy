import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormControlErrorsEnum } from './../../../shared/enums/FormControlErrorsEnum';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';
import { Login } from 'src/app/store/user/user.actions';

interface FormValue {
  username: string;
  password: string;
}

enum FormEnum {
  Username = 'username',
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
  controlErrors = FormControlErrorsEnum;

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
      [this.formControls.Username]: ['username', [Validators.required]],
      [this.formControls.Password]: ['Username1', [Validators.required]],
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
