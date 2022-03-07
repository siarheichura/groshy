import { WalletSettingsComponent } from './../wallet-settings/wallet-settings.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { walletSelector } from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from '../../enums/RouterEnum';
import { GetWallet } from 'src/app/store/wallets/wallets.actions';
import { Wallet } from '../../classes/Wallet';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-wallet-header',
  templateUrl: './wallet-header.component.html',
  styleUrls: ['./wallet-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletHeaderComponent implements OnInit {
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
        nzWidth: '400px',
        nzContentParams: {
          wallet: resp,
        },
        nzContent: WalletSettingsComponent,
      });
    });
  }
}
