import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TabsEnum } from 'src/app/shared/enums/TabsEnum';

import { AddExpense, AddIncome } from '../../../store/wallets/wallets.actions';
import { markFormControlsDirty } from '../../../shared/helpers/form.helper';

@Component({
  selector: 'app-money-move-form',
  templateUrl: './money-move-form.component.html',
  styleUrls: ['./money-move-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveFormComponent implements OnInit {
  @Input() walletId: string;
  @Input() tabName: string;
  @Input() categories: string[];

  moneymoveForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.moneymoveForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  submitForm(): void {
    if (this.moneymoveForm.valid) {
      if (this.tabName === TabsEnum.Expenses) {
        this.store.dispatch(
          AddExpense({
            payload: {
              expense: this.moneymoveForm.value,
              walletId: this.walletId,
            },
          })
        );
        this.moneymoveForm.reset();
      } else {
        this.store.dispatch(
          AddIncome({
            payload: {
              income: this.moneymoveForm.value,
              walletId: this.walletId,
            },
          })
        );
        this.moneymoveForm.reset();
      }
    } else {
      markFormControlsDirty(this.moneymoveForm);
    }
  }
}
