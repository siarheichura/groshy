import { moneyMoveByPeriodSelector } from './../../store/wallets/wallets.selectros';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Expense } from './../../shared/interfaces/Expense';

import {
  AddExpense,
  AddIncome,
  GetExpensesByPeriod,
  GetIncomeByPeriod,
  GetMoneyMoveByPeriodTemplate,
  RemoveExpense,
  RemoveIncome,
} from './../../store/wallets/wallets.actions';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import dayjs, { Dayjs } from 'dayjs';

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

  addExpense(formValue: Expense) {
    this.store.dispatch(
      AddExpense({
        payload: {
          expense: formValue,
          walletId: this.walletId,
        },
      })
    );

    setTimeout(() => {
      this.store.dispatch(
        GetExpensesByPeriod({
          payload: {
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    }, 500);
  }

  removeExpense(id: string) {
    this.store.dispatch(RemoveExpense({ payload: { expenseId: id } }));

    setTimeout(() => {
      this.store.dispatch(
        GetExpensesByPeriod({
          payload: {
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    }, 500);
  }

  editExpense(id: string) {}

  addIncome(formValue: Expense) {
    this.store.dispatch(
      AddIncome({
        payload: {
          income: formValue,
          walletId: this.walletId,
        },
      })
    );

    setTimeout(() => {
      this.store.dispatch(
        GetIncomeByPeriod({
          payload: {
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    }, 500);
  }

  removeIncome(id: string) {
    this.store.dispatch(RemoveIncome({ payload: { incomeId: id } }));

    setTimeout(() => {
      this.store.dispatch(
        GetIncomeByPeriod({
          payload: {
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    }, 500);
  }
}
