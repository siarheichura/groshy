import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { UserProfileComponent } from '@components/user-profile/user-profile.component';
import { RouterEnum } from '@shared/enums/Router.enum';
import { User } from '@shared/interfaces/User';
import { DRAWER_WIDTH } from '@shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user: User;
  routes = RouterEnum;

  constructor(private router: Router, private drawerService: NzDrawerService) {}

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }

  printDrawer(): void {
    this.drawerService.create({
      nzContent: UserProfileComponent,
      nzTitle: 'Profile',
      nzWidth: DRAWER_WIDTH,
      nzContentParams: {
        user: this.user,
      },
    });
  }
}
