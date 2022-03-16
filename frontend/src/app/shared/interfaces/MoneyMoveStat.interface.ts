import { MoneyMoveCategory } from './MoneyMoveCategory.interface';

export interface MoneyMoveStat {
  category: MoneyMoveCategory;
  amount: number;
}
