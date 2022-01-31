import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

export const Expense = model('Expense', ExpenseSchema);
