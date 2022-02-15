import { Component, Input, OnInit } from '@angular/core';
import { Income } from './../../interfaces/Income';
import { Expense } from './../../interfaces/Expense';

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

  constructor() {}

  ngOnInit(): void {}
}
