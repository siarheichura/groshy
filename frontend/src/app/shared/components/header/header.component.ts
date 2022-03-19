import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { UserProfileComponent } from '../../../components/user-profile/user-profile.component';
import { RouterEnum } from '../../enums/Router.enum';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  routes = RouterEnum;

  constructor(
    private router: Router,
    private drawerService: NzDrawerService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }

  printDrawer(): void {
    this.drawerService.create({
      nzContent: UserProfileComponent,
    });
  }
}
