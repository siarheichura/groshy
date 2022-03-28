import { Schema, model, Types } from 'mongoose';
import { MoneyMove } from '../shared/interfaces/MoneyMove';

const ExpenseSchema = new Schema<MoneyMove>({
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  comment: { type: String },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  checkBase64: { type: String },
});

export const ExpenseModel = model('Expense', ExpenseSchema);
