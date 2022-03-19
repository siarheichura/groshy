import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetUser } from 'src/app/store/user/user.actions';
import { AuthService } from './../../services/auth.service';
import { userSelector } from 'src/app/store/user/user.selectros';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  user$ = this.store.select(userSelector);

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(GetUser({ payload: this.authService.decodedToken.id }));
  }
}
