import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { NzIconService } from 'ng-zorro-antd/icon'

import { SetCurrentTab } from '@store/shared/shared.actions'
import { ROUTER } from '@shared/enums/Router.enum'
import { SVG } from '@shared/constants/svg-images'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  ROUTER = ROUTER

  constructor(
    private router: Router,
    private store: Store,
    private iconService: NzIconService
  ) {
    this.iconService.addIconLiteral('ng-zorro:expense', SVG.EXPENSE)
    this.iconService.addIconLiteral('ng-zorro:income', SVG.INCOME)
    this.iconService.addIconLiteral('ng-zorro:wallet', SVG.WALLET)
    this.iconService.addIconLiteral('ng-zorro:menu', SVG.MENU)
  }

  onRouteClick(route: string): void {
    this.store.dispatch(SetCurrentTab({ payload: route }));
  }
}
