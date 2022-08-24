import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SetCurrentTab } from '@store/shared/shared.actions';
import { TABS } from '@shared/enums/Tabs.enum';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SetCurrentTab({ payload: TABS.WALLETS }));
  }
}
