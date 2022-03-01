import { Expense } from './Expense';
import { Income } from './Income';
import { Schema, model, Types } from 'mongoose';

interface Wallet {
  date: Date;
  name: string;
  currency: string;
  initialAmount: number;
  balance: number;
  expenses: Types.ObjectId[];
  income: Types.ObjectId[];
  expenseCategories: Types.ObjectId[];
  incomeCategories: Types.ObjectId[];
  expensesSum: number;
  incomeSum: number;
  user: Types.ObjectId;
}

function getBalance(this: Wallet) {
  return this.initialAmount - this.expensesSum + this.incomeSum;
}

const WalletSchema = new Schema<Wallet>({
  name: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
  currency: { type: String, required: true },
  initialAmount: { type: Number },
  balance: { type: Number, get: getBalance },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  income: [{ type: Schema.Types.ObjectId, ref: 'Income' }],
  expenseCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  incomeCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

WalletSchema.virtual('expensesSum', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'wallet',
}).get(function (this: Wallet, data: Expense[]) {
  const result = data.reduce((prev, curr) => prev + curr.amount, 0);
  return result;
});

WalletSchema.virtual('incomeSum', {
  ref: 'Income',
  localField: '_id',
  foreignField: 'wallet',
}).get(function (this: Wallet, data: Income[]) {
  const result = data.reduce((prev, curr) => prev + curr.amount, 0);
  return result;
});

export const WalletModel = model('Wallet', WalletSchema);
