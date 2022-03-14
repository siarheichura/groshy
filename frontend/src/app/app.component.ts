import { CheckAuth } from './store/user/user.actions';
import { environment } from './../environments/environment';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { loadingSelector } from './store/shared/shared.selectros';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(loadingSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (localStorage.getItem(environment.LocalStorageUserKey)) {
      // this.store.dispatch(CheckAuth());
    }
  }
}
