import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { User } from 'src/app/shared/interfaces/User';
import { Logout } from 'src/app/store/user/user.actions';
import { userSelector } from './../../store/user/user.selectros';

interface userFormValue {
  username: string;
  email: string;
}
enum userFormEnum {
  Username = 'username',
  Email = 'email',
}

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  userFormControls = userFormEnum;

  user$: Observable<User> = this.store.select(userSelector);

  constructor(
    private router: Router,
    private drawer: NzDrawerRef,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.drawer.nzTitle = user.username;

      this.userForm = this.fb.group({
        [this.userFormControls.Username]: [
          user.username,
          [Validators.required],
        ],
        [this.userFormControls.Email]: [user.email, [Validators.required]],
      });
    });
  }

  onLogoutBtnClick() {
    this.store.dispatch(Logout());
    this.drawer.close();
    this.router.navigate([RouterEnum.Auth]);
  }
}
