import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { WalletService } from '../../services/wallet.service';
import { RouterEnum } from './../../shared/enums/RouterEnum';
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
  walletRoute: string = RouterEnum.Wallet;
  createWalletForm: FormGroup;
  formControls = FormEnum;
  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];
  wallets: Wallet[] = [];
  loading: boolean = false;
  isModalVisible: boolean = false;

  constructor(
    private walletService: WalletService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getWallets();

    this.createWalletForm = this.fb.group({
      [this.formControls.Name]: ['', [Validators.required]],
      [this.formControls.Amount]: ['', [Validators.required]],
      [this.formControls.Currency]: ['', [Validators.required]],
    });
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  getWallets(): void {
    this.loading = true;
    this.walletService.fetchWallets().subscribe((response) => {
      this.wallets = response;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  addWallet(): void {
    if (this.createWalletForm.valid) {
      this.walletService
        .addWallet(this.createWalletForm.value)
        .subscribe(() => {
          this.wallets.push(this.createWalletForm.value);
          this.createWalletForm.reset();
          this.closeModal();
          this.getWallets();
        });
    } else {
      Object.values(this.createWalletForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  removeWallet(event: Event, id: string): void {
    event.stopPropagation();
    this.walletService.removeWallet(id).subscribe((response) => {
      this.wallets = this.wallets.filter((wallet) => {
        return wallet._id !== id;
      });
      this.cdr.detectChanges();
    });
  }
}
