import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../shared/interfaces/Wallet';

enum FormEnum {
  Name = 'name',
  Amount = 'amount',
  Currency = 'currency',
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  wallets: Wallet[] = [];
  loading: boolean = false;

  constructor(
    private walletService: WalletService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getWallets();
  }

  getWallets(): void {
    this.loading = true;
    this.walletService.fetchWallets().subscribe((response) => {
      this.wallets = response;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
