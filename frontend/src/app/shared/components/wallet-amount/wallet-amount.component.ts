import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { WalletSettingComponent } from '../wallet-setting/wallet-setting.component';
import { walletSelector } from 'src/app/store/wallets/wallets.selectros';
import { RouterEnum } from '../../enums/RouterEnum';
import { Wallet } from '../../interfaces/Wallet';
import { GetWallet } from 'src/app/store/wallets/wallets.actions';

@Component({
  selector: 'app-user-amount',
  templateUrl: './wallet-amount.component.html',
  styleUrls: ['./wallet-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletAmountComponent implements OnInit {
  routes = RouterEnum;
  walletId: string = this.route.snapshot.params['id']; // ???
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

  handleRouteClick(param: string): void {
    this.router.navigate([param], { relativeTo: this.route });
  }

  printDrawer(): void {
    this.drawerService.create({
      nzTitle: 'Wallet setting',
      nzContent: WalletSettingComponent,
    });
  }
}
