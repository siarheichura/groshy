import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { GetUser } from './../../../store/user/user.actions';
import { userSelector } from './../../../store/user/user.selectros';
import { UserProfileComponent } from '../../../components/user-profile/user-profile.component';
import { RouterEnum } from '../../enums/Router.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  routes = RouterEnum;

  user$ = this.store.select(userSelector);

  constructor(
    private router: Router,
    private drawerService: NzDrawerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser({ payload: '622f96cc9285ecc9be4a90df' }));
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param]);
  }

  printDrawer(): void {
    this.drawerService.create({
      nzContent: UserProfileComponent,
    });
  }
}
