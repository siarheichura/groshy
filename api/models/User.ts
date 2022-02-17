import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  wallets: Types.ObjectId[];
}

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 7);
};

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, set: hashPassword },
  wallets: [{ type: Schema.Types.ObjectId, ref: 'Wallet' }],
});

UserSchema.methods.checkPassword = (
  incomingPassword: string,
  userPassword: string
) => bcrypt.compareSync(incomingPassword, userPassword);

export const UserModel = model<User>('User', UserSchema);
