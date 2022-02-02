import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private drawerRef: NzDrawerRef
  ) {}

  ngOnInit(): void {}

  onLogoutBtnClick() {
    this.authService.logout();
    this.drawerRef.close();
    this.router.navigate([RouterEnum.Auth]);
  }
}
