import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { walletSelector } from '@store/wallets/wallets.selectros';
import { GetWallet, GetWalletCategories } from '@store/wallets/wallets.actions';
import { ChangeTab } from '@store/shared/shared.actions';
import { RouterEnum } from '@shared/enums/Router.enum';
import { MoneyMoveTypes } from '@shared/enums/MoneyMoveTypes.enum';
import { Wallet } from '@shared/classes/Wallet';
import { DRAWER_WIDTH } from '@shared/constants/constants';
import { WalletSettingsComponent } from '@components/wallet-page/wallet-settings/wallet-settings.component';

@Component({
  selector: 'app-wallet-header',
  templateUrl: './wallet-header.component.html',
  styleUrls: ['./wallet-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletHeaderComponent implements OnInit {
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
    this.store.dispatch(
      GetWalletCategories({
        payload: { walletId: this.walletId },
      })
    );
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
    this.wallet$.pipe(take(1)).subscribe(resp => {
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
}
