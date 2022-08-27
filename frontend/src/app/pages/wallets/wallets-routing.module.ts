import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {WalletsComponent} from './wallets.component'
import {WalletsListComponent} from './wallets-list/wallets-list.component'
import {TransfersComponent} from './transfers/transfers.component'
import {ArchiveComponent} from './archive/archive.component'
import {ROUTER} from '@shared/enums/Router.enum'

const routes: Routes = [
  {
    path: ROUTER.INDEX,
    component: WalletsComponent,
    children: [
      {path: ROUTER.INDEX, component: WalletsListComponent},
      {path: ROUTER.TRANSFERS, component: TransfersComponent},
      {path: ROUTER.ARCHIVE, component: ArchiveComponent},
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsRoutingModule {
}
