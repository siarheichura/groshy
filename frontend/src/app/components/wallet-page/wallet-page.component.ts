import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ResetSharedState } from './../../store/shared/shared.actions';
import { ResetWalletState } from 'src/app/store/wallets/wallets.actions';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
})
export class WalletPageComponent implements OnDestroy {
  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.store.dispatch(ResetWalletState());
    this.store.dispatch(ResetSharedState());
  }
}
