import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

import {
  AddCategory,
  EditWallet,
  RemoveCategory,
  RemoveWallet,
} from '../../store/wallets/wallets.actions';
import { categoriesSelector } from '../../store/wallets/wallets.selectros';
import { MoneyMoveTypes } from '../../shared/enums/MoneyMoveTypes.enum';
import { MoneyMoveCategory } from '../../shared/interfaces/MoneyMoveCategory.interface';
import { Wallet } from '../../shared/classes/Wallet';

@Component({
  selector: 'app-wallet-settings',
  templateUrl: './wallet-settings.component.html',
  styleUrls: ['./wallet-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSettingsComponent implements OnInit {
  moneyMoveTypes = MoneyMoveTypes;

  @Input() wallet: Wallet;

  @ViewChild('expenseInputElement', { static: false })
  expenseInputElement: ElementRef;
  @ViewChild('incomeInputElement', { static: false })
  incomeInputElement: ElementRef;
  expenseCategoryControl = new FormControl();
  incomeCategoryControl = new FormControl();
  expenseCategoryInputVisible = false;
  incomeCategoryInputVisible = false;

  categories$: Observable<MoneyMoveCategory[]> = this.store.select(
    categoriesSelector()
  );
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

  constructor(
    private store: Store,
    private drawer: NzDrawerRef,
    private router: Router
  ) {}

  ngOnInit(): void {}

  editWallet(wallet: Wallet) {
    this.store.dispatch(
      EditWallet({ payload: { id: this.wallet.id, updatedWallet: wallet } })
    );
    this.drawer.close();
  }

  removeWallet(): void {
    this.store.dispatch(RemoveWallet({ payload: { id: this.wallet.id } }));
    this.drawer.close();
    this.router.navigate([RouterEnum.Index]);
  }

  showExpenseCategoryInput(): void {
    this.expenseCategoryInputVisible = true;
    setTimeout(() => {
      this.expenseInputElement.nativeElement.focus();
    }, 10);
  }

  showIncomeCategoryInput(): void {
    this.incomeCategoryInputVisible = true;
    setTimeout(() => {
      this.incomeInputElement.nativeElement.focus();
    }, 10);
  }

  addCategory(name: string, type: string): void {
    if (name) {
      this.store.dispatch(
        AddCategory({
          payload: { walletId: this.wallet.id, category: { name, type } },
        })
      );
      this.expenseCategoryControl.reset();
      this.incomeCategoryControl.reset();
    }
    this.expenseCategoryInputVisible = false;
    this.incomeCategoryInputVisible = false;
  }

  removeCategory(id: string): void {
    this.store.dispatch(
      RemoveCategory({
        payload: { id },
      })
    );
  }
}
