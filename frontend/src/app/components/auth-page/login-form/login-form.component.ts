import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './../../../services/auth.service';
import { NzMessageEnum } from 'src/app/shared/enums/NzMessagesEnum';
import { FormControlErrorsEnum } from './../../../shared/enums/FormControlErrorsEnum';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';

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
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [this.formControls.Username]: ['', [Validators.required]],
      [this.formControls.Password]: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.authLoading$.next(true);

      this.authService.login(this.formValue).subscribe({
        next: () => {
          this.loginForm.reset();
          this.message.success(NzMessageEnum.LOGIN_SUCCESS);
          this.authService.authLoading$.next(false);
          this.router.navigate([RouterEnum.Index]);
        },
        error: (err) => {
          this.message.error(err.error.message);
          this.authService.authLoading$.next(false);
        },
      });
    } else {
      markFormControlsDirty(this.loginForm.controls);
    }
  }

  handleRouteClick(param: string): void {
    this.router.navigate([RouterEnum.Auth, param]);
  }
}
