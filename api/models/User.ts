import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

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

UserSchema.methods.hashPassword = function (password: string) {
  return bcrypt.hashSync(password, 7);
};

UserSchema.methods.checkPassword = function (
  password: string,
  userPassword: string
) {
  return bcrypt.compareSync(password, userPassword);
};

export const UserModel = model<User>('User', UserSchema);
