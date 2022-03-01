import dayjs, { Dayjs } from 'dayjs';

export interface MoneyMoveCategory {
  _id: string;
  name: string;
}

export interface MoneyMoveItem {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
}

export interface DayMoneyMoveItem {
  date: Dayjs;
  moneyMove: MoneyMoveItem[];
  moneyMoveSum: number;
}

export class PeriodMoneyMove {
  moneyMove: MoneyMoveItem[];
  startDate: Dayjs;
  finishDate?: Dayjs;

  constructor(moneyMove: MoneyMoveItem[], startDate: Dayjs, finishDate: Dayjs) {
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.moneyMove = moneyMove;
  }

  get periodMoneyMove(): DayMoneyMoveItem[] {
    const arr = Array(this.finishDate.diff(this.startDate, 'day') + 1).fill(
      null
    );

    return arr.map((item, index) => {
      const date = this.startDate.add(index, 'day');
      const moneyMove = this.moneyMove.filter((item) =>
        dayjs(item.date).isSame(date, 'day')
      );
      const moneyMoveSum = moneyMove.reduce(
        (prev, curr) => prev + curr.amount,
        0
      );
      return {
        date: date,
        moneyMove: moneyMove,
        moneyMoveSum: moneyMoveSum,
      };
    });
  }
}
