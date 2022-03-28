import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  ChangePassword,
  UpdateUserInfo,
} from './../../store/user/user.actions';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { User } from 'src/app/shared/interfaces/User';
import { Logout } from 'src/app/store/user/user.actions';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';
import { FormValidators } from './../../shared/validators/form-validators';

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

interface UserFormValue {
  username: string;
  email: string;
}

enum UserFormEnum {
  Username = 'username',
  Email = 'email',
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;

  isUserFormVisible: boolean = false;

  userForm: FormGroup;
  userFormControls = UserFormEnum;
  passwordForm: FormGroup;
  passwordFormControls = PasswordFormEnum;

  get passwordFormValue(): PasswordFormValue {
    return this.passwordForm.value as PasswordFormValue;
  }

  get userFormValue(): UserFormValue {
    return this.userForm.value as UserFormValue;
  }

  constructor(
    private router: Router,
    private drawer: NzDrawerRef,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        [this.passwordFormControls.prevPassword]: ['', [Validators.required]],
        [this.passwordFormControls.newPassword]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            FormValidators.password,
          ],
        ],
        [this.passwordFormControls.confirmPassword]: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            FormValidators.password,
          ],
        ],
      },
      {
        validator: FormValidators.mustMatch(
          this.passwordFormControls.newPassword,
          this.passwordFormControls.confirmPassword
        ),
      }
    );
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

  onProfileEditBtnClick(): void {
    this.isUserFormVisible = true;
    this.userFormInit();
  }

  userFormInit(): void {
    this.userForm = this.fb.group({
      [this.userFormControls.Username]: [
        this.user.username,
        [Validators.required, Validators.minLength(3), FormValidators.username],
      ],
      [this.userFormControls.Email]: [
        this.user.email,
        [Validators.required, Validators.email],
      ],
    });
  }

  onUserFormCancel(): void {
    this.isUserFormVisible = false;
  }

  onUserFormSubmit(): void {
    if (
      this.userForm.valid &&
      (this.userForm.controls['username'].value !== this.user.username ||
        this.userForm.controls['email'].value !== this.user.email)
    ) {
      this.store.dispatch(
        UpdateUserInfo({ payload: { id: this.user.id, ...this.userFormValue } })
      );
      this.isUserFormVisible = false;
      this.drawer.close();
    } else {
      markFormControlsDirty(this.userForm);
    }
  }

  onLogoutBtnClick(): void {
    this.store.dispatch(Logout());
    this.drawer.close();
    void this.router.navigate([RouterEnum.Auth]);
  }
}
