import { Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from '../../../shared/interfaces/Wallet';
import { markFormControlsDirty } from 'src/app/shared/helpers/form.helper';

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
export class WalletFormComponent implements OnInit {
  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];

  @Input() walletForEdit$: Observable<Wallet | undefined>;

  walletForEdit: Wallet | undefined;
  walletForm: FormGroup;
  formControls = FormEnum;

  constructor(private fb: FormBuilder, private modalRef: NzModalRef) {}

  ngOnInit(): void {
    if (this.walletForEdit$) {
      this.walletForEdit$.subscribe((resp) => (this.walletForEdit = resp));
    }
    this.initFormGroup(this.walletForEdit);
  }

  initFormGroup(walletForEdit?: Wallet): void {
    this.walletForm = this.fb.group({
      [this.formControls.Name]: [
        walletForEdit ? walletForEdit.name : '',
        Validators.required,
      ],
      [this.formControls.Amount]: [
        walletForEdit ? walletForEdit.amount : '',
        Validators.required,
      ],
      [this.formControls.Currency]: [
        walletForEdit ? walletForEdit.currency : '',
        Validators.required,
      ],
    });
  }
}
