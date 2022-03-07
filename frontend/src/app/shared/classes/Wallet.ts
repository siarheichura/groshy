interface WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
}

export class Wallet implements WalletI {
  id: string = '';
  name: string = '';
  currency: string = '';
  balance: number = 0;

  constructor(wallet: WalletI) {
    Object.assign(this, wallet);
  }
}
