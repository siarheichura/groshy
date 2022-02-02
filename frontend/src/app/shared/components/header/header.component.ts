import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private drawerService: NzDrawerService
  ) {}
  username: string;

  ngOnInit(): void {
    this.username = this.authService.jwtDecode().username;
  }

  handleRouteClick(param: string): void {
    this.router.navigate([param]);
  }

  openDrawer() {
    const drawer = this.drawerService.create({
      nzTitle: this.username,
      nzContent: UserProfileComponent,
    });
  }
}
