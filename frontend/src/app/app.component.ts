import { UntilDestroy } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { GetUser } from './store/user/user.actions';
import { UserService } from './services/user.service';
import { userSelector } from './store/user/user.selectros';
import { loadingSelector } from './store/shared/shared.selectros';
import { RouterEnum } from './shared/enums/Router.enum';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(loadingSelector);
  user$ = this.store.select(userSelector);
  isHeaderVisible: boolean = false;

  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setHeaderVisibility();
    this.getUser(this.userService.token);
  }

  setHeaderVisibility(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((r: any) => {
        this.isHeaderVisible =
          !r.url.includes(RouterEnum.Auth) && !r.url.includes(RouterEnum.Error);
      });
  }

  getUser(token: string): void {
    if (token) {
      this.store.dispatch(
        GetUser({ payload: this.userService.decodedToken.id })
      );
    }
  }
}
