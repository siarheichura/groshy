import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { MoneyMoveCategory } from './../../interfaces/MoneyMoveCategory.interface';
import { MoneyMoveItem } from './../../interfaces/MoneyMoveItem.interface';

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent {
  @Input() items: MoneyMoveItem[];
  @Input() title: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() categories: MoneyMoveCategory[];

  @Output() onItemClick = new EventEmitter();
  @Output() onRemoveItem = new EventEmitter();

  constructor(private store: Store) {}

  onMoneyMoveItemClick(item: MoneyMoveItem) {
    this.onItemClick.emit(item);
  }

  removeMoneyMoveItem(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.onRemoveItem.emit(id);
  }
}
