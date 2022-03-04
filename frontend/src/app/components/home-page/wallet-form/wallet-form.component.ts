import { MoneyMoveTypes } from './../../../shared/enums/MoneyMoveTypes';
import { Observable, map, take, Subscription, skip } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { categoriesSelector } from './../../../store/wallets/wallets.selectros';
import { MoneyMoveCategory } from './../../../shared/interfaces/DayMoneyMove';
import { Wallet } from 'src/app/shared/classes/Wallet';

enum FormEnum {
  Name = 'name',
  Balance = 'balance',
  Currency = 'currency',
  ExpenseCategories = 'expenseCategories',
  IncomeCategories = 'incomeCategories',
}

@Component({
  selector: 'app-create-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletFormComponent implements OnInit, OnDestroy {
  @Input() walletForEdit: Wallet;
  currencies: string[] = ['USD', 'EUR', 'BYN', 'RUB'];

  walletForm: FormGroup;
  formControls = FormEnum;

  categories$: Observable<MoneyMoveCategory[]> =
    this.store.select(categoriesSelector);
  incomeCategories: MoneyMoveCategory[];
  expenseCategories: MoneyMoveCategory[];

  categoriesSubs: Subscription = this.categories$.subscribe((resp) => {
    this.incomeCategories = resp.filter(
      (item) => item.type.toLowerCase() === MoneyMoveTypes.Income
    );
    this.expenseCategories = resp.filter(
      (item) => item.type.toLowerCase() === MoneyMoveTypes.Expense
    );
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.walletForm = this.fb.group({
      [this.formControls.Name]: [
        this.walletForEdit ? this.walletForEdit.name : '',
        Validators.required,
      ],
      [this.formControls.Balance]: [
        this.walletForEdit ? this.walletForEdit.balance : '',
        Validators.required,
      ],
      [this.formControls.Currency]: [
        this.walletForEdit ? this.walletForEdit.currency : '',
        Validators.required,
      ],

      [this.formControls.ExpenseCategories]: [
        this.expenseCategories.map((item) => item.name),
        [Validators.required],
      ],
      [this.formControls.IncomeCategories]: [
        this.incomeCategories.map((item) => item.name),
        [Validators.required],
      ],
    });
  }
  ngOnDestroy(): void {
    this.categoriesSubs.unsubscribe();
  }
}
