import { Wallet } from '../models/Wallet';

export class WalletDto {
  id: string;
  name: string;
  currency: string;
  balance: number;
  creationDate: Date;
  isArchived: boolean;

  constructor(model: Wallet) {
    this.id = model.id;
    this.name = model.name;
    this.currency = model.currency;
    this.balance = model.balance;
    this.creationDate = model.creationDate;
    this.isArchived = model.isArchived;
  }
}
