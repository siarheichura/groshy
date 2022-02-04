import { Schema, model } from 'mongoose';

export interface Income {
  _id: string;
  category: string;
  date: Date;
  amount: number;
}

const IncomeSchema = new Schema<Income>({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

export const Income = model('Income', IncomeSchema);
