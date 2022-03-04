import { Schema, model, Types } from 'mongoose';
import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';

interface Category {
  type: MoneyMoveTypes;
  name: string;
  basic: boolean;
  wallet: Types.ObjectId;
  user: Types.ObjectId;
}

const CategorySchema = new Schema<Category>({
  type: {
    type: String,
    enum: MoneyMoveTypes,
    required: true,
  },
  name: { type: String, required: true },
  basic: { type: Boolean },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const CategoryModel = model('Category', CategorySchema);
