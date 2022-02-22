import { Schema, model, Types } from 'mongoose';

const baseExpenseCategories = [
  'House',
  'Car',
  'Health',
  'Clothes',
  'Food',
  'Gifts',
  'Sport',
  'Others',
];
const baseIncomeCategories = ['Salary', 'Gifts', 'Busines', 'Others'];

interface Wallet {
  _id: string;
  date: Date;
  name: string;
  currency: string;
  amount: number;
  expenses: Types.ObjectId[];
  income: Types.ObjectId[];
  expenseCategories: string[];
  incomeCategories: string[];
  user: Types.ObjectId;
}

const WalletSchema = new Schema<Wallet>({
  name: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  income: [{ type: Schema.Types.ObjectId, ref: 'Income' }],
  expenseCategories: {
    type: [String],
    required: true,
    default: baseExpenseCategories,
  },
  incomeCategories: {
    type: [String],
    required: true,
    default: baseIncomeCategories,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const WalletModel = model('Wallet', WalletSchema);
