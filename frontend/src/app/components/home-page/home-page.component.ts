import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';

import { WalletModalComponent } from './wallet-modal/wallet-modal.component';
import {
  AddWallet,
  GetWallets,
  ResetWalletState,
} from 'src/app/store/wallets/wallets.actions';
import { ResetSharedState } from './../../store/shared/shared.actions';
import { walletsSelector } from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from './../../shared/enums/Router.enum';
import { ListItem } from './../../shared/interfaces/ListItem.interface';
import { Wallet } from 'src/app/shared/classes/Wallet';
import { MODAL_WIDTH } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  wallets$: Observable<Wallet[]> = this.store.select(walletsSelector);
  walletsForList$: Observable<ListItem[]> = this.wallets$.pipe(
    map((wallets: Wallet[]) => {
      return wallets.map(({ id, name, balance, currency }) => ({
        id,
        name,
        description: `${balance} ${currency}`,
      }));
    })
  );

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

  onWalletClick(walletId: string): void {
    void this.router.navigate([RouterEnum.Wallet, walletId]);
  }

  printAddWalletModal() {
    const modal = this.modal.create({
      nzTitle: 'Create Wallet',
      nzWidth: MODAL_WIDTH,
      nzContent: WalletModalComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.addWallet(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ResetWalletState());
    this.store.dispatch(ResetSharedState());
  }
}
