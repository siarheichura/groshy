import { Schema, model } from 'mongoose';

const IncomeSchema = new Schema({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

export const Income = model('Income', IncomeSchema);
