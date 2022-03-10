import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { WalletSettingsComponent } from '../wallet-settings/wallet-settings.component';
import { RouterEnum } from '../../shared/enums/Router.enum';
import { MoneyMoveTypes } from 'src/app/shared/enums/MoneyMoveTypes.enum';
import { Wallet } from '../../shared/classes/Wallet';
import { DRAWER_WIDTH } from './../../shared/constants/constants';

import { walletSelector } from 'src/app/store/wallets/wallets.selectros';
import {
  GetWallet,
  ResetWalletState,
} from 'src/app/store/wallets/wallets.actions';
import { ChangeTab } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-wallet-header',
  templateUrl: './wallet-header.component.html',
  styleUrls: ['./wallet-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletHeaderComponent implements OnInit, OnDestroy {
  tabs = [MoneyMoveTypes.Expense, MoneyMoveTypes.Income];
  routes = RouterEnum;
  walletId: string = (this.route.snapshot.params as { id: string }).id;
  wallet$: Observable<Wallet> = this.store.select(walletSelector);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetWallet({ payload: { id: this.walletId } }));
  }

  onTabClick(tabName: string): void {
    this.store.dispatch(ChangeTab({ payload: tabName }));
  }

  handleRouteClick(
    params: string[],
    settings = { relativeTo: this.route }
  ): void {
    void this.router.navigate(params, settings);
  }

  printDrawer() {
    this.wallet$.pipe(take(1)).subscribe((resp) => {
      this.drawerService.create({
        nzTitle: 'Settings',
        nzWidth: DRAWER_WIDTH,
        nzContentParams: {
          wallet: resp,
        },
        nzContent: WalletSettingsComponent,
      });
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ResetWalletState());
  }
}
