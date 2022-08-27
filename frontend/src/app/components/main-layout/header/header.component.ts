import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { currentTabSelector } from '@store/shared/shared.selectros'
import { User } from '@shared/interfaces/User'
import { SVG } from '@shared/constants/svg-images'
import { NzIconService } from 'ng-zorro-antd/icon'
import { Logout } from '@store/user/user.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user: User

  currentTab$: Observable<string> = this.store.select(currentTabSelector)

  constructor(
    private store: Store,
    private iconService: NzIconService,
  ) {
    this.iconService.addIconLiteral('ng-zorro:groshy_mini', SVG.GROSHY_MINI)
  }

  onLogoutBtnClick(): void {
    this.store.dispatch(Logout())
  }
}
