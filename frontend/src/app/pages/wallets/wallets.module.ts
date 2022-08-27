import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@shared/shared.module'

import { WalletsRoutingModule } from './wallets-routing.module'
import { WalletsComponent } from './wallets.component'
import { TransfersComponent } from './transfers/transfers.component'
import { ArchiveComponent } from './archive/archive.component'
import { WalletsListComponent } from './wallets-list/wallets-list.component'
import { WalletsHeaderComponent } from './wallets-header/wallets-header.component'
import { WalletFormComponent } from './wallet-form/wallet-form.component'

@NgModule({
  declarations: [
    WalletsComponent,
    TransfersComponent,
    ArchiveComponent,
    WalletsListComponent,
    WalletsHeaderComponent,
    WalletFormComponent,
  ],
  imports: [CommonModule, SharedModule, WalletsRoutingModule],
  exports: [],
  providers: [],
})
export class WalletsModule {
}
