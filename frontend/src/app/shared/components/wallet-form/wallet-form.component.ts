import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from 'src/app/shared/classes/Wallet';

enum FormEnum {
  Name = 'name',
  Balance = 'balance',
  Currency = 'currency',
  ExpenseCategories = 'expenseCategories',
  IncomeCategories = 'incomeCategories',
}

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletFormComponent implements OnInit {
  @Input() walletForEdit: Wallet;
  @Input() wallet: Wallet;

  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];

  walletForm: FormGroup;
  formControls = FormEnum;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.walletForm = this.fb.group({
      [this.formControls.Name]: [
        this.wallet ? this.wallet.name : '',
        Validators.required,
      ],
      [this.formControls.Balance]: [
        this.wallet ? this.wallet.balance : '',
        Validators.required,
      ],
      [this.formControls.Currency]: [
        this.wallet ? this.wallet.currency : '',
        Validators.required,
      ],
    });
  }
}
