import { Income } from './../models/Income';
import { Expense } from './../models/Expense';

export class MoneyMoveDto {
  id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;

  constructor(model: Expense | Income) {
    this.id = model.id;
    this.category = model.category;
    this.amount = model.amount;
    this.date = model.date;
    this.comment = model.comment;
  }
}
