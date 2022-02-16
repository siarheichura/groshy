import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { WalletSettingsComponent } from '../wallet-settings/wallet-settings.component';
import { walletSelector } from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from '../../enums/RouterEnum';
import { Wallet } from '../../interfaces/Wallet';
import { GetWallet } from 'src/app/store/wallets/wallets.actions';

@Component({
  selector: 'app-wallet-header',
  templateUrl: './wallet-header.component.html',
  styleUrls: ['./wallet-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletHeaderComponent implements OnInit {
  routes = RouterEnum;
  walletId: string = (this.route.snapshot.params as { id: string }).id;
  wallet$: Observable<Wallet | null> = this.store.select(walletSelector);

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

  printDrawer(): void {
    this.drawerService.create({
      nzTitle: 'Wallet setting',
      nzContent: WalletSettingsComponent,
    });
  }
}
