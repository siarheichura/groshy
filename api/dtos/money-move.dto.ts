import { MoneyMove } from '../shared/interfaces/MoneyMove';

export class MoneyMoveDto {
  id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
  checkBase64: string;

  constructor(model: MoneyMove) {
    this.id = model.id;
    this.category = model.category;
    this.amount = model.amount;
    this.date = model.date;
    this.comment = model.comment;
    this.checkBase64 = model.checkBase64;
  }
}
