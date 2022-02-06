import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  AddWallet,
  EditWallet,
  GetWallets,
  RemoveWallet,
} from 'src/app/store/wallets/wallets.actions';
import {
  walletsLoadingSelector,
  walletsSelector,
} from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from './../../shared/enums/RouterEnum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Wallet } from './../../shared/interfaces/Wallet';
import { CreateWalletFormComponent } from './wallet-form/wallet-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  wallets$: Observable<Wallet[]> = this.store.select(walletsSelector);
  loading$: Observable<boolean> = this.store.select(walletsLoadingSelector);

  constructor(
    private modal: NzModalService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetWallets());
  }

  createWallet(wallet: Wallet): void {
    this.store.dispatch(AddWallet({ payload: wallet }));
    this.modal.closeAll();
  }

  editWallet(walletId: string, updatedWallet: Wallet): void {
    this.store.dispatch(
      EditWallet({ payload: { id: walletId, updatedWallet: updatedWallet } })
    );
    this.modal.closeAll();
  }

  removeWallet(walletId: string): void {
    this.store.dispatch(RemoveWallet({ payload: { id: walletId } }));
  }

  onWalletClick(walletId: string): void {
    this.router.navigate([RouterEnum.Wallet, walletId]);
  }

  printModal(walletIdForEdit?: string) {
    let modalName = '';
    let walletForEdit;
    let onFormSubmit;

    if (walletIdForEdit) {
      modalName = 'Edit';

      this.wallets$.subscribe((resp) => {
        walletForEdit = resp.find((wallet) => wallet._id === walletIdForEdit);
      });

      onFormSubmit = (wallet: Wallet) => {
        this.editWallet(walletIdForEdit, wallet);
      };
    } else {
      modalName = 'Create';
      onFormSubmit = (wallet: Wallet) => {
        this.createWallet(wallet);
      };
    }

    this.modal.create({
      nzTitle: `${modalName} Wallet`,
      nzWidth: '400px',
      nzContent: CreateWalletFormComponent,
      nzComponentParams: {
        button: modalName,
        walletForEdit: walletForEdit,
        onFormSubmit: onFormSubmit,
      },
      nzFooter: null,
    });
  }
}
