import { Wallet } from '../models/Wallet';

export class WalletDto {
  id: string;
  name: string;
  currency: string;
  balance: number;
  date: Date;

  constructor(model: Wallet) {
    this.id = model.id;
    this.name = model.name;
    this.currency = model.currency;
    this.balance = model.balance;
    this.date = model.date;
  }
}
