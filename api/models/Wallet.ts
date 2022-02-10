import { Schema, model, Types } from 'mongoose';

interface Wallet {
  _id: string;
  name: string;
  currency: string;
  amount: number;
  expenses: Types.ObjectId[];
  income: Types.ObjectId[];
  user: Types.ObjectId;
}

const WalletSchema = new Schema<Wallet>({
  name: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  income: [{ type: Schema.Types.ObjectId, ref: 'Income' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const WalletModel = model('Wallet', WalletSchema);
