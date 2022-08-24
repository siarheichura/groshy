import { Schema, model } from 'mongoose';
import { Operation } from '../shared/interfaces/Operation';

const OperationSchema = new Schema<Operation>({
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  comment: { type: String },
  date: { type: Date, required: true, default: Date.now },
  checkImg: { type: String },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  walletName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const OperationModel = model('Operation', OperationSchema);
