import dayjs from 'dayjs';
import { MoneyMoveDayItem } from '../classes/MoneyMoveDayItem';
import { MoneyMoveItem } from './../interfaces/MoneyMoveItem.interface';

export function getMoneyMoveItemsByPeriod(
  items: MoneyMoveItem[]
): MoneyMoveDayItem[] {
  const sortedDates = items
    .map((item) => dayjs(item.date).valueOf())
    .sort((a, b) => a - b);
  const startDate = dayjs(sortedDates[0]);
  const finishDate = dayjs(sortedDates[sortedDates.length - 1]);
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
