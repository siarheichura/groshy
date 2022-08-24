import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { ROUTER } from '@shared/enums/Router.enum'
import { markFormControlsDirty } from '@shared/helpers/form.helper'
import { Login } from '@store/user/user.actions'

enum FROM_CONTROLS {
  EMAIL = 'email',
  PASSWORD = 'password',
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  FROM_CONTROLS = FROM_CONTROLS
  ROUTER = ROUTER

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [FROM_CONTROLS.EMAIL]: ['chura.siarhei@gmail.com', [Validators.required]],
      [FROM_CONTROLS.PASSWORD]: ['Qwerty12', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(Login({ payload: this.loginForm.value }));
    } else {
      markFormControlsDirty(this.loginForm);
    }
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([ROUTER.AUTH, param]);
  }
}
