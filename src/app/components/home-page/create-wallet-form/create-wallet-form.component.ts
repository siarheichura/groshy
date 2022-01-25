import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from './../../../shared/interfaces/Wallet';
import { WalletService } from './../../../services/wallet.service';

enum FormEnum {
  Name = 'name',
  Amount = 'amount',
  Currency = 'currency',
}

@Component({
  selector: 'app-create-wallet-form',
  templateUrl: './create-wallet-form.component.html',
  styleUrls: ['./create-wallet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWalletFormComponent implements OnInit {
  @Input() wallets: Wallet[];

  createWalletForm: FormGroup;
  formControls = FormEnum;
  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.createWalletForm = this.fb.group({
      [this.formControls.Name]: ['', Validators.required],
      [this.formControls.Amount]: ['', Validators.required],
      [this.formControls.Currency]: ['', Validators.required],
    });
  }

  onButtonCreateClick(): void {
    if (this.createWalletForm.valid) {
      this.walletService
        .addWallet(this.createWalletForm.value)
        .subscribe(() => {
          this.createWalletForm.reset();
          this.modalRef.close();
          window.location.reload();
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
}
