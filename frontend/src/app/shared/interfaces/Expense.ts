export class Expense {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;

  constructor(
    _id: string,
    category: string,
    amount: number,
    date: Date,
    comment?: string
  ) {
    this._id = _id;
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.comment = comment;
  }
}
