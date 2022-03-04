import { GetBasicCategories } from './../../store/wallets/wallets.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

import {
  AddWallet,
  EditWallet,
  GetWallets,
  RemoveWallet,
} from 'src/app/store/wallets/wallets.actions';
import { walletsSelector } from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from './../../shared/enums/RouterEnum';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ListItem } from './../../shared/interfaces/ListItem';
import { WalletFormComponent } from './wallet-form/wallet-form.component';
import { Wallet } from 'src/app/shared/classes/Wallet';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  wallets$: Observable<Wallet[]> = this.store.select(walletsSelector);

  // ??? При редактировании мне надо доставать отдельно balance и отдельно currency
  // walletsForList$: Observable<ListItem[]> = this.wallets$.pipe(
  //   map((wallets: Wallet[]) => {
  //     return wallets.map(({ id, name, balance, currency }) => ({
  //       id,
  //       name,
  //       description: `${balance} ${currency}`,
  //     }));
  //   })
  // );

  constructor(
    private modal: NzModalService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetWallets());
  }

  addWallet(wallet: Wallet): void {
    this.store.dispatch(AddWallet({ payload: wallet }));
  }

  editWallet(walletId: string, updatedWallet: Wallet): void {
    this.store.dispatch(
      EditWallet({ payload: { id: walletId, updatedWallet: updatedWallet } })
    );
  }

  removeWallet(walletId: string): void {
    this.store.dispatch(RemoveWallet({ payload: { id: walletId } }));
  }

  onWalletClick(walletId: string): void {
    void this.router.navigate([RouterEnum.Wallet, walletId]);
  }

  printAddWalletModal() {
    this.store.dispatch(GetBasicCategories());

    const modal = this.modal.create({
      nzTitle: 'Create Wallet',
      nzWidth: '400px',
      nzContent: WalletFormComponent,
      nzOnOk: () => {
        const form = modal.getContentComponent().walletForm;
        if (form.valid) {
          this.addWallet(form.value);
        } else {
          markFormControlsDirty(form);
          return false;
        }
        return true;
      },
    });
  }

  printEditWalletModal(wallet: Wallet) {
    const walletForEdit$ = this.wallets$.pipe(
      map((result) => {
        return result.find((item) => item.id === wallet.id);
      }),
      take(1)
    );

    const modal = this.modal.create({
      nzTitle: 'Edit Wallet',
      nzWidth: '400px',
      nzContent: WalletFormComponent,
      nzComponentParams: {
        walletForEdit: wallet,
        // walletForEdit$: walletForEdit$,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().walletForm;

        if (form.valid) {
          this.editWallet(wallet.id, form.value);
        } else {
          markFormControlsDirty(form);
          return false;
        }
        return true;
      },
    });
  }
}
