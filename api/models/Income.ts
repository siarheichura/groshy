import { Schema, model, Types } from 'mongoose';

export interface Income {
  id: string;
  category: string;
  date: Date;
  amount: number;
  comment: string;
  wallet: Types.ObjectId;
}

const IncomeSchema = new Schema<Income>({
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  comment: { type: String },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
});

export const IncomeModel = model('Income', IncomeSchema);
