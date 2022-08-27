import { Schema, model, Types } from 'mongoose'

export interface Wallet {
  id: string
  name: string
  currency: string
  balance: number
  creationDate: Date
  isArchived: boolean
  user: Types.ObjectId
}

const WalletSchema = new Schema<Wallet>({
  name: { type: String, required: true },
  currency: { type: String, required: true },
  balance: { type: Number, required: true },
  creationDate: { type: Date, required: true, default: new Date() },
  isArchived: { type: Boolean, required: true, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const WalletModel = model('Wallet', WalletSchema)
