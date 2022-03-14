import { Schema, model, Types } from 'mongoose';

interface Token {
  user: Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema<Token>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const TokenModel = model<Token>('Token', TokenSchema);
