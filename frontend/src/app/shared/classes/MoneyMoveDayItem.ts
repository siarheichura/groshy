import { Dayjs } from 'dayjs';
import { MoneyMoveItem } from '../interfaces/DayMoneyMove';

export class MoneyMoveDayItem {
  date: Dayjs;
  moneyMoveItems: MoneyMoveItem[];
  moneyMoveSum: number;

  constructor(
    date: Dayjs,
    moneyMoveItems: MoneyMoveItem[],
    moneyMoveSum: number
  ) {
    this.date = date;
    this.moneyMoveItems = moneyMoveItems;
    this.moneyMoveSum = moneyMoveSum;
  }
}
