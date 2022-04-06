import {
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, QueryList, TemplateRef
} from '@angular/core';
import { Store } from '@ngrx/store';

import { MoneyMoveCategory } from './../../interfaces/MoneyMoveCategory.interface';
import { MoneyMoveItem } from './../../interfaces/MoneyMoveItem.interface';
import {MoneyMoveDayCardItemDirective} from "./money-move-day-card-item.directive";

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent implements OnInit, AfterViewInit {
  @ContentChild(MoneyMoveDayCardItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<HTMLElement>;
  @ContentChild(MoneyMoveDayCardItemDirective) itemTemplateRef: MoneyMoveDayCardItemDirective;
  @Input() items: MoneyMoveItem[];
  @Input() title: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() categories: MoneyMoveCategory[];

  @Output() onItemClick = new EventEmitter();
  @Output() onRemoveItem = new EventEmitter();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
  }

  onMoneyMoveItemClick(item: MoneyMoveItem) {
    this.onItemClick.emit(item);
  }

  removeMoneyMoveItem(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.onRemoveItem.emit(id);
  }
}
