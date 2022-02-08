import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { AuthService } from './../../../services/auth.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { RouterEnum } from '../../enums/RouterEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  routes = RouterEnum;
  username: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.jwtDecode().username;
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }

  printDrawer(): void {
    this.drawerService.create({
      nzTitle: this.username,
      nzContent: UserProfileComponent,
    });
  }
}
