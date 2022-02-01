import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { markFormControlsDirty } from './../../../shared/helpers/form.helper';

import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { NzMessageEnum } from 'src/app/shared/enums/NzMessagesEnum';
import { FormControlErrorsEnum } from './../../../shared/enums/FormControlErrorsEnum';

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
})
export class RegistrationFormComponent implements OnInit {
  formControls = FormEnum;
  routes = RouterEnum;
  controlErrors = FormControlErrorsEnum;

  registrationForm: FormGroup;

  get formValue(): FormValue {
    return this.registrationForm.value as FormValue;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      [FormEnum.Username]: ['', [Validators.required, Validators.minLength(3)]],
      [FormEnum.Email]: ['', [Validators.required, Validators.email]],
      [FormEnum.Password]: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.authService.authLoading$.next(true);

      this.authService.registration(this.formValue).subscribe({
        next: () => {
          this.registrationForm.reset();
          this.message.success(NzMessageEnum.REGISTRATION_SUCCESS);
          this.authService.authLoading$.next(false);
          this.router.navigate([RouterEnum.Auth]);
        },
        error: () => {
          this.message.error(NzMessageEnum.BASIC_ERROR);
          this.authService.authLoading$.next(false);
        },
      });
    } else {
      markFormControlsDirty(this.registrationForm.controls);
      console.log(this.registrationForm.controls);
    }
  }

  handleRouteClick(param: string): void {
    this.router.navigate([param]);
  }
}
