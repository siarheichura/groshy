import { Schema, model } from 'mongoose';

const WalletSchema = new Schema({
  name: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  expenses: { type: Array, ref: 'Expense', default: [] },
  income: { type: Array, ref: 'Income', default: [] },
});

export const Wallet = model('Wallet', WalletSchema);
