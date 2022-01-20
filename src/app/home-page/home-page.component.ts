import { Wallet } from './../models/Wallet';
import { WalletService } from './../services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  wallets: Wallet[] = [];
  isLoading: boolean = false;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.getWallets();
  }

  getWallets() {
    this.isLoading = true;

    this.walletService
      .fetchWallets()
      .pipe(delay(500))
      .subscribe((response) => {
        this.wallets = response;
        this.isLoading = false;
      });
  }
}
