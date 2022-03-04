import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { GetUserInfo } from './../../../store/user/user.actions';
import { userInfoSelector } from './../../../store/user/user.selectros';
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

  user$ = this.store
    .select(userInfoSelector)
    .pipe(tap((user) => (this.username = user.username)));

  constructor(
    private router: Router,
    private drawerService: NzDrawerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetUserInfo());
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
