import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Income } from './../../interfaces/Income';
import { Expense } from './../../interfaces/Expense';
import { RemoveExpense } from './../../../store/wallets/wallets.actions';

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent implements OnInit {
  @Input() items: Expense[] | Income[] | null;
  @Input() amount: number | null;
  @Input() walletCurrency: string | null;
  @Input() title: string;

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onDeleteCard(id: string) {
    this.onDelete.emit(id);
  }

  onEditCard(id: string) {
    this.onEdit.emit(id);
  }
}
