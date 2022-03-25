interface WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
  date: Date;
}

export class Wallet implements WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
  date: Date;

  constructor(wallet: WalletI) {
    Object.assign(this, wallet);
  }
}
