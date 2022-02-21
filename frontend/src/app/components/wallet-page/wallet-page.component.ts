import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import dayjs, { Dayjs } from 'dayjs';

import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from './../../shared/interfaces/Expense';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';

import {
  AddExpense,
  AddIncome,
  GetExpensesByPeriod,
  GetIncomeByPeriod,
  GetMoneyMoveByPeriodTemplate,
  RemoveExpense,
  RemoveIncome,
} from './../../store/wallets/wallets.actions';
import { ChangeTab } from 'src/app/store/shared/shared.actions';
import { moneyMoveByPeriodSelector } from './../../store/wallets/wallets.selectros';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit {
  expenseCategories = ['Food', 'Car', 'Clothes', 'Sport'];
  incomeCategories = ['Salary', 'Busines', 'Gifts'];
  routes = RouterEnum;
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  startDate: Dayjs = dayjs().subtract(2, 'day');
  finishDate: Dayjs = dayjs();
  walletId: string = (this.route.snapshot.params as { id: string }).id;
  moneyMove$ = this.store.select(moneyMoveByPeriodSelector);

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      GetMoneyMoveByPeriodTemplate({
        payload: {
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );

    this.store.dispatch(
      GetExpensesByPeriod({
        payload: {
          walletId: this.walletId,
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );

    this.store.dispatch(
      GetIncomeByPeriod({
        payload: {
          walletId: this.walletId,
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );
  }

  onTabClick(tabName: string): void {
    this.store.dispatch(ChangeTab({ payload: tabName }));
  }

  addExpense(formValue: Expense) {
    this.store.dispatch(
      AddExpense({
        payload: {
          expense: formValue,
          walletId: this.walletId,
        },
      })
    );
  }

  removeExpense(id: string) {
    this.store.dispatch(RemoveExpense({ payload: { expenseId: id } }));
  }

  editExpense(id: string) {}

  addIncome(formValue: Income) {
    this.store.dispatch(
      AddIncome({
        payload: {
          income: formValue,
          walletId: this.walletId,
        },
      })
    );
  }

  removeIncome(id: string) {
    this.store.dispatch(RemoveIncome({ payload: { incomeId: id } }));
  }
}
