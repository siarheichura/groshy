import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { NzMessageEnum } from 'src/app/shared/enums/NzMessagesEnum';
import { markFormControlsDirty } from './../../../shared/helpers/form.helper';
import { FormValidators } from './../../../shared/validators/form-validators';

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
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      [FormEnum.Username]: ['', [Validators.required, FormValidators.username]],
      [FormEnum.Email]: ['', [Validators.required, Validators.email]],
      [FormEnum.Password]: ['', [Validators.required, FormValidators.password]],
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
        error: (err) => {
          this.message.error(err.error.message);
          this.authService.authLoading$.next(false);
        },
      });
    } else {
      markFormControlsDirty(this.registrationForm);
    }
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }
}
