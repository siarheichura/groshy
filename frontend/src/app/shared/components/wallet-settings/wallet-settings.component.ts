import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { MoneyMoveTypes } from './../../enums/MoneyMoveTypes';
import { categoriesSelector } from './../../../store/wallets/wallets.selectros';
import { MoneyMoveCategory } from './../../interfaces/DayMoneyMove';
import { Wallet } from './../../classes/Wallet';

@Component({
  selector: 'app-wallet-settings',
  templateUrl: './wallet-settings.component.html',
  styleUrls: ['./wallet-settings.component.scss'],
})
export class WalletSettingsComponent implements OnInit {
  @Input() wallet: Wallet;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  inputVisible = false;
  inputValue = '';
  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 0);
  }

  categories$: Observable<MoneyMoveCategory[]> =
    this.store.select(categoriesSelector);
  expenseCategories$: Observable<MoneyMoveCategory[]> = this.categories$.pipe(
    map((categories) =>
      categories.filter(
        (category) => category.type.toLowerCase() === MoneyMoveTypes.Expense
      )
    )
  );
  incomeCategories$: Observable<MoneyMoveCategory[]> = this.categories$.pipe(
    map((categories) =>
      categories.filter(
        (category) => category.type.toLowerCase() === MoneyMoveTypes.Income
      )
    )
  );

  handleInputConfirm() {}

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
