import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, reduce, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { InitWalletExpenses } from './../../shared/interfaces/Expense';
import { InitWalletIncome } from 'src/app/shared/interfaces/Income';
import {
  walletCurrencySelector,
  walletInitExpensesSelector,
  walletInitIncomeSelector,
} from 'src/app/store/wallets/wallets.selectros';
import {
  GetInitWalletExpenses,
  GetInitWalletIncome,
} from 'src/app/store/wallets/wallets.actions';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit {
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  expenseCategories = ['Food', 'Car', 'Clothes', 'Sport'];
  incomeCategories = ['Salary', 'Busines', 'Gifts'];

  walletId: string = (this.route.snapshot.params as { id: string }).id;
  walletCurrency$: Observable<string> = this.store.select(
    walletCurrencySelector
  );
  initExpenses$: Observable<InitWalletExpenses> = this.store.select(
    walletInitExpensesSelector
  );
  initIncome$: Observable<InitWalletIncome> = this.store.select(
    walletInitIncomeSelector
  );
  itemsForDisplay$:
    | Observable<InitWalletExpenses>
    | Observable<InitWalletIncome> = this.initExpenses$;

  yesterdayMoneyMove: number;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      GetInitWalletExpenses({ payload: { walletId: this.walletId } })
    );

    this.store.dispatch(
      GetInitWalletIncome({ payload: { walletId: this.walletId } })
    );
  }

  onTabClick(tabName: string) {
    if (tabName === TabsEnum.Expenses) {
      this.itemsForDisplay$ = this.initExpenses$;
    } else {
      this.itemsForDisplay$ = this.initIncome$;
    }
  }
}
