import {Types} from "mongoose";

export interface Wallet {
  id: string;
  name: string;
  currency: string;
  balance: number;
  creationDate: Date;
  isArchived: boolean;
  user: Types.ObjectId;
}

export interface WalletCreate {
  name: string;
  currency: string;
  balance: number;
  user: string,
}
