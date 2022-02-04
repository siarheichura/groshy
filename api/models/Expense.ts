import { Schema, model } from 'mongoose';

export interface Expense {
  _id: string;
  category: string;
  date: Date;
  amount: number;
}

const ExpenseSchema = new Schema<Expense>({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

export const Expense = model('Expense', ExpenseSchema);
