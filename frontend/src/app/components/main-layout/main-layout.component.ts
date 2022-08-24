import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'

import { GetUser } from '@store/user/user.actions'
import { userSelector } from '@store/user/user.selectros'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  user$ = this.store.select(userSelector)

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.store.dispatch(GetUser())
  }
}
