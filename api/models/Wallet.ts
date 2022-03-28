import { Schema, model, Types } from 'mongoose';
import { MoneyMove } from './../shared/interfaces/MoneyMove';

export interface Wallet {
  id: string;
  name: string;
  date: Date;
  currency: string;
  initialAmount: number;
  balance: number;
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
  initialAmount: { type: Number, required: true },
  balance: { type: Number, required: true, get: getBalance },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

WalletSchema.virtual('expensesSum', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'wallet',
}).get(function (this: Wallet, data: MoneyMove[]) {
  if (data) {
    const result = data.reduce((prev, curr) => prev + curr.amount, 0);
    return result;
  }
});

WalletSchema.virtual('incomeSum', {
  ref: 'Income',
  localField: '_id',
  foreignField: 'wallet',
}).get(function (this: Wallet, data: MoneyMove[]) {
  if (data) {
    const result = data.reduce((prev, curr) => prev + curr.amount, 0);
    return result;
  }
});

export const WalletModel = model('Wallet', WalletSchema);
