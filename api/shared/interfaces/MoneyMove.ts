import { Types } from 'mongoose';

export interface MoneyMove {
  id: string;
  category: string;
  date: Date;
  amount: number;
  comment: string;
  wallet: Types.ObjectId;
  checkBase64: string;
}
