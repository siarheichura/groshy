import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import * as uuid from 'uuid';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  wallets: Types.ObjectId[];
  isActivated: boolean;
  activationLink: string;
  checkPassword: (password: string) => boolean;
}

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 7);
};

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, set: hashPassword },
  wallets: [{ type: Schema.Types.ObjectId, ref: 'Wallet' }],
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, default: uuid.v4() },
});

UserSchema.methods.checkPassword = function (
  this: User,
  incomingPassword: string
) {
  return bcrypt.compareSync(incomingPassword, this.password);
};

export const UserModel = model<User>('User', UserSchema);
