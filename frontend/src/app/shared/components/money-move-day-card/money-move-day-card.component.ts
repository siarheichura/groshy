import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  MoneyMoveItem,
  MoneyMoveCategory,
} from './../../interfaces/DayMoneyMove';

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent implements OnInit {
  @Input() items: MoneyMoveItem[];
  @Input() title: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() categories: MoneyMoveCategory[];

  @Output() onItemClick = new EventEmitter();
  @Output() onRemoveItem = new EventEmitter();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onMoneyMoveItemClick(item: MoneyMoveItem) {
    this.onItemClick.emit(item);
  }

  removeMoneyMoveItem(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.onRemoveItem.emit(id);
  }
}
