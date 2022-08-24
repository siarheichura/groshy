import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Wallet } from '@shared/classes/Wallet';
import { CURRENCIES } from '@shared/constants/constants';
import { markFormControlsDirty } from '@shared/helpers/form.helper';

enum FormControlsEnum {
  NAME = 'name',
  BALANCE = 'balance',
  CURRENCY = 'currency',
}

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
})
export class WalletFormComponent implements OnInit {
  FORM_CONTROLS = FormControlsEnum;

  @Input() wallet: Wallet

  currencies: string[] = CURRENCIES;
  walletForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.updateModalConfig()
    this.initWalletForm()
  }

  initWalletForm(): void {
    this.walletForm = this.fb.group({
      [this.FORM_CONTROLS.NAME]: [this.wallet ? this.wallet.name : '', Validators.required],
      [this.FORM_CONTROLS.BALANCE]: [this.wallet ? this.wallet.balance : '', Validators.required],
      [this.FORM_CONTROLS.CURRENCY]: [this.wallet ? this.wallet.currency : '', Validators.required],
    })
  }

  updateModalConfig(): void {
    this.modal.updateConfig({
      nzOnOk: () => {
        if (this.walletForm.valid) {
          return this.walletForm.value
        } else {
          markFormControlsDirty(this.walletForm)
          return false
        }
      },
    })
  }

  onSubmitButtonClick(data: Wallet): void {
    if (this.walletForm.valid) {
      this.modal.close(data);
    } else {
      markFormControlsDirty(this.walletForm);
    }
  }

  onCancelButtonClick(): void {
    this.modal.close();
  }
}
