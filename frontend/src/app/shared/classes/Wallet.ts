interface WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
  isArchived: boolean;
  date: Date;
}

export interface WalletsForList {
  id: string;
  name: string;
  description: string;
}

export class Wallet implements WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
  isArchived: boolean;
  date: Date;

  constructor(wallet: WalletI) {
    Object.assign(this, wallet);
  }
}
