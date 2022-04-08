import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadingSelector } from './../../store/shared/shared.selectros';
import { ResetSharedState } from './../../store/shared/shared.actions';
import { ResetWalletState } from 'src/app/store/wallets/wallets.actions';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
})
export class WalletPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(ResetWalletState());
    this.store.dispatch(ResetSharedState());
  }
}
