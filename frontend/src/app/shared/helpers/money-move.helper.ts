import dayjs, { Dayjs } from 'dayjs';
import { MoneyMoveDayItem } from '../classes/MoneyMoveDayItem';
import { MoneyMoveItem } from './../interfaces/MoneyMoveItem.interface';

export function getMoneyMoveItemsByPeriod(
  items: MoneyMoveItem[],
  startDate: Dayjs,
  finishDate?: Dayjs
): MoneyMoveDayItem[] {
  const templateArr = Array(finishDate.diff(startDate, 'day') + 1).fill(null);

  const result = templateArr.map((item, index) => {
    const date = startDate.add(index, 'day');
    const moneyMoveItems = items.filter((item) =>
      dayjs(item.date).isSame(date, 'day')
    );
    const moneyMoveSum = moneyMoveItems.reduce(
      (prev, curr) => prev + curr.amount,
      0
    );
    return new MoneyMoveDayItem(date, moneyMoveItems, moneyMoveSum);
  });

  return result;
}
