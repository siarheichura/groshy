import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { NzModalService } from 'ng-zorro-antd/modal'

import { WalletFormComponent } from '../wallet-form/wallet-form.component'
import { AddWallet, EditWallet, RemoveWallet } from '@store/wallets/wallets.actions'
import { walletsSelector } from '@store/wallets/wallets.selectros'
import { userSelector } from '@store/user/user.selectros'
import { MODAL_WIDTH } from '@shared/constants/constants'
import { Wallet } from '@shared/interfaces/Wallet.interface'
import { User } from '@shared/interfaces/User'

@UntilDestroy()
@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent implements OnInit {
  wallets$: Observable<Wallet[]> = this.store.select(walletsSelector)
  user$: Observable<User> = this.store.select(userSelector)

  userId: string

  constructor(
    private store: Store,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe(user => this.userId = user.id)
  }

  addWallet(wallet: Wallet): void {
    this.store.dispatch(AddWallet({ payload: { userId: this.userId, wallet } }))
  }

  editWallet(id: string, updatedWallet: Wallet): void {
    this.store.dispatch(EditWallet({ payload: { id, updatedWallet } }))
  }

  removeWallet(id: string): void {
    this.store.dispatch(RemoveWallet({ payload: { id } }))
  }

  archiveWallet(wallet: Wallet): void {
    this.store.dispatch(EditWallet({ payload: { id: wallet.id, updatedWallet: { ...wallet, isArchived: true } } }))
  }

  printAddWalletModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Add Wallet',
      nzWidth: MODAL_WIDTH,
      nzContent: WalletFormComponent,
    })

    modal.afterClose.subscribe(res => {
      if (res) {
        this.addWallet(res)
      }
    })
  }

  printEditWalletModal(wallet: Wallet): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Wallet',
      nzWidth: MODAL_WIDTH,
      nzContent: WalletFormComponent,
      nzComponentParams: { wallet: wallet },
    })

    modal.afterClose.subscribe(res => {
      if (res) {
        this.editWallet(wallet.id, res)
      }
    })
  }

  printRemoveConfirmModal(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure?',
      nzContent: 'This wallet and all operations will be permanently deleted',
      nzOnOk: () => this.removeWallet(id),
    })
  }

  printArchiveConfirmModal(wallet: Wallet): void {
    this.modal.confirm({
      nzTitle: 'Are you sure?',
      nzContent: 'This wallet will be removed to Archive, you can restore it. All operations will be on their places',
      nzOnOk: () => this.archiveWallet(wallet),
    })
  }
}
