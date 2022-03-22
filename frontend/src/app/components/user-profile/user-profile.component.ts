import { FormValidators } from './../../shared/validators/form-validators';
import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import {
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
} from './../../store/user/user.actions';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { User } from 'src/app/shared/interfaces/User';
import { Logout } from 'src/app/store/user/user.actions';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

interface PasswordFormValue {
  prevPassword: string;
  newPassword: string;
  confirmPassword: string;
}

enum PasswordFormEnum {
  prevPassword = 'prevPassword',
  newPassword = 'newPassword',
  confirmPassword = 'confirmPassword',
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;

  passwordForm: FormGroup;
  passwordFormControls = PasswordFormEnum;

  usernameInputVisible: boolean = false;
  usernameControl: FormControl = new FormControl();
  emailInputVisible: boolean = false;
  emailControl: FormControl = new FormControl();

  get passwordFormValue(): PasswordFormValue {
    return this.passwordForm.value as PasswordFormValue;
  }

  constructor(
    private router: Router,
    private drawer: NzDrawerRef,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      [this.passwordFormControls.prevPassword]: ['', [Validators.required]],
      [this.passwordFormControls.newPassword]: [
        '',
        [Validators.required, Validators.minLength(8), FormValidators.password],
      ],
      [this.passwordFormControls.confirmPassword]: [
        '',
        [Validators.required, Validators.minLength(8), FormValidators.password],
      ],
    });
  }

  onPasswordFormSubmit(): void {
    if (this.passwordForm.valid) {
      this.store.dispatch(
        ChangePassword({
          payload: {
            userId: this.user.id,
            passwords: this.passwordFormValue,
          },
        })
      );
      this.drawer.close();
    } else {
      markFormControlsDirty(this.passwordForm);
    }
  }

  onUsernameEditBtnClick(): void {
    this.emailInputVisible = false;
    this.usernameInputVisible = true;
    this.usernameControl = new FormControl(this.user.username);
  }

  onEmailEditBtnClick(): void {
    this.usernameInputVisible = false;
    this.emailInputVisible = true;
    this.emailControl = new FormControl(this.user.email);
  }

  editUsername(): void {
    if (this.usernameControl.value !== this.user.username) {
      this.store.dispatch(
        ChangeUsername({
          payload: {
            userId: this.user.id,
            username: this.usernameControl.value,
          },
        })
      );
    }
    this.usernameInputVisible = false;
  }

  editEmail(): void {
    if (this.emailControl.value !== this.user.email) {
      this.store.dispatch(
        ChangeEmail({
          payload: { userId: this.user.id, email: this.emailControl.value },
        })
      );
    }
    this.emailInputVisible = false;
  }

  onLogoutBtnClick(): void {
    this.store.dispatch(Logout());
    this.drawer.close();
    void this.router.navigate([RouterEnum.Auth]);
  }
}
