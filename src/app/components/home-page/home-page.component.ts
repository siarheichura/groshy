import { HttpClient } from '@angular/common/http';
import { RouterEnum } from './../../shared/enums/RouterEnum';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { delay } from 'rxjs';

import { Wallet } from '../../interfaces/Wallet';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  wallets: Wallet[] = [];
  isLoading: boolean = false;
  walletRoute: string = RouterEnum.Wallet;

  constructor(
    private walletService: WalletService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

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
        this.cdr.detectChanges();
      });
  }

  createWallet() {
    this.walletService.addWallet().subscribe((resp) => {
      console.log(resp);
    });
  }
}
