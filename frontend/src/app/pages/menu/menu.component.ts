import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { SetCurrentTab } from '@store/shared/shared.actions'
import { TABS } from '@shared/enums/Tabs.enum'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(SetCurrentTab({ payload: TABS.MENU }))
  }
}
