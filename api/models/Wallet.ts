import { Schema, model, Types } from 'mongoose';
import { Expense } from './Expense';
import { Income } from './Income';

interface Wallet {
  _id: string;
  name: string;
  currency: string;
  amount: number;
  expenses: Expense[] | undefined;
  income: Income[] | undefined;
  user: Types.ObjectId;
}

const WalletSchema = new Schema<Wallet>({
  name: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  expenses: { type: Array, ref: 'Expense', required: true, default: [] },
  income: { type: Array, ref: 'Income', default: [] },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const WalletModel = model('Wallet', WalletSchema);
