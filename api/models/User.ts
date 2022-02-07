import { Schema, model, Types } from 'mongoose';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  wallets: Types.ObjectId[];
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  wallets: [{ type: Schema.Types.ObjectId, ref: 'Wallet', default: [] }],
});

export const UserModel = model<User>('User', UserSchema);
