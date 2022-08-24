import { Operation } from '../shared/interfaces/Operation';
import { Types } from "mongoose";

export class OperationDto {
  id: string;
  type: string;
  category: string;
  amount: number;
  currency: string;
  date: Date;
  comment?: string;
  checkImg: string;
  wallet: Types.ObjectId;
  walletName: string;

  constructor(model: Operation) {
    this.id = model.id;
    this.type = model.type;
    this.category = model.category;
    this.amount = model.amount;
    this.currency = model.currency;
    this.comment = model.comment;
    this.date = model.date;
    this.checkImg = model.checkImg;
    this.wallet = model.wallet;
    this.walletName = model.walletName;
  }
}
