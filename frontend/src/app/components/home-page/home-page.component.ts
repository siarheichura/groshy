import { Observable } from 'rxjs';
import { remove, walletsSelector } from './../../store/reducers/wallets';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RouterEnum } from './../../shared/enums/RouterEnum';
import { Wallet } from './../../shared/interfaces/Wallet';
import { WalletService } from '../../services/wallet.service';
import { CreateWalletFormComponent } from './wallet-form/wallet-form.component';
import { add, edit } from 'src/app/store/reducers/wallets';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  wallets: Wallet[] = [];
  loading: boolean = false;

  wallets$: Observable<Wallet[]>;

  constructor(
    private walletService: WalletService,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getWallets();

    this.wallets$ = this.walletService.fetchWallets();

    // this.wallets$ = this.store.select(walletsSelector);
  }

  getWallets(): void {
    this.loading = true;
    this.walletService.fetchWallets().subscribe((response) => {
      this.wallets = response;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  createWallet(wallet: Wallet): void {
    this.walletService.addWallet(wallet).subscribe(() => {
      this.modal.closeAll();
      this.getWallets();
    });

    this.store.dispatch(add(wallet));
  }

  editWallet(walletId: string, updatedWallet: Wallet): void {
    this.walletService.editWallet(walletId, updatedWallet).subscribe(() => {
      this.modal.closeAll();
      this.getWallets();
    });

    this.store.dispatch(edit());
  }

  deleteWallet(walletId: string): void {
    this.walletService.removeWallet(walletId).subscribe((response) => {
      this.wallets = this.wallets.filter((wallet) => {
        return wallet._id !== walletId;
      });
      this.cdr.detectChanges();
    });

    this.store.dispatch(remove());
  }

  onWalletClick(walletId: string): void {
    this.router.navigate([RouterEnum.Wallet, walletId]);
  }

  printModal(walletIdForEdit?: string) {
    let modalName = '';
    let walletForEdit;
    let onFormSubmit;

    if (walletIdForEdit) {
      modalName = 'Edit';
      walletForEdit = this.wallets.find(
        (wallet) => wallet._id === walletIdForEdit
      );
      onFormSubmit = (wallet: Wallet) => {
        this.editWallet(walletIdForEdit, wallet);
      };
    } else {
      modalName = 'Create';
      onFormSubmit = (wallet: Wallet) => {
        this.createWallet(wallet);
      };
    }

    this.modal.create({
      nzTitle: `${modalName} Wallet`,
      nzWidth: '400px',
      nzContent: CreateWalletFormComponent,
      nzComponentParams: {
        button: modalName,
        walletForEdit: walletForEdit,
        onFormSubmit: onFormSubmit,
      },
      nzFooter: null,
    });
  }
}
