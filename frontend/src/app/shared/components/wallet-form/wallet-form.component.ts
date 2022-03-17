import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CURRENCIES } from './../../constants/constants';
import { Wallet } from 'src/app/shared/classes/Wallet';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

interface FormValue {
  Name: string;
  Balance: number;
  Currency: string;
}

enum FormEnum {
  Name = 'name',
  Balance = 'balance',
  Currency = 'currency',
}

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletFormComponent implements OnInit {
  @Input() wallet: Wallet;
  @Input() submitButtonName: string;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  currencies: string[] = CURRENCIES;

  walletForm: FormGroup;
  formControls = FormEnum;

  get formValue(): FormValue {
    return this.walletForm.value as FormValue;
  }

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

  onSubmitButtonClick() {
    if (this.walletForm.valid) {
      this.onSubmit.emit(this.formValue);
    } else {
      markFormControlsDirty(this.walletForm);
    }
  }

  onCancelButtonClick() {
    this.onCancel.emit();
  }
}
