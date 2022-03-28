import { GetUser } from './store/user/user.actions';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { userSelector } from './store/user/user.selectros';
import { loadingSelector } from './store/shared/shared.selectros';
import { RouterEnum } from './shared/enums/Router.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading$: Observable<boolean> = this.store.select(loadingSelector);
  user$ = this.store.select(userSelector);
  isHeaderVisible: boolean = false;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((r: any) => {
        this.isHeaderVisible = !r.url.includes(RouterEnum.Auth);
      });

    if (this.authService.token) {
      this.store.dispatch(
        GetUser({ payload: this.authService.decodedToken.id })
      );
    }
  }
}
