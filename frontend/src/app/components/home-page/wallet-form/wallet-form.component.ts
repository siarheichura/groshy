import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from '../../../shared/interfaces/Wallet';

enum FormEnum {
  Name = 'name',
  Amount = 'amount',
  Currency = 'currency',
}

@Component({
  selector: 'app-create-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWalletFormComponent implements OnInit {
  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];

  @Input() button: string;
  @Input() walletForEdit: Wallet;
  @Input() onFormSubmit: (wallet: Wallet) => void;

  createWalletForm: FormGroup;
  formControls = FormEnum;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFormGroup(this.walletForEdit);
  }

  initFormGroup(walletForEdit?: Wallet): void {
    let walletName, walletAmount, walletCurrency;

    if (walletForEdit) {
      walletName = walletForEdit.name;
      walletAmount = walletForEdit.amount;
      walletCurrency = walletForEdit.currency;
    } else {
      walletName = walletAmount = walletCurrency = '';
    }

    this.createWalletForm = this.fb.group({
      [this.formControls.Name]: [walletName, Validators.required],
      [this.formControls.Amount]: [walletAmount, Validators.required],
      [this.formControls.Currency]: [walletCurrency, Validators.required],
    });
  }
}
