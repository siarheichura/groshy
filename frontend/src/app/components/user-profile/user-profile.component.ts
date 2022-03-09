import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Logout } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private drawerRef: NzDrawerRef,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onLogoutBtnClick() {
    this.store.dispatch(Logout());
    this.drawerRef.close();
    this.router.navigate([RouterEnum.Auth]);
  }
}
