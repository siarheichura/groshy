import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';
import { CategoryModel } from './../models/Category';
import { IncomeModel } from './../models/Income';
import { ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';
import { UserModel } from './../models/User';

interface JwtPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export class WalletController {
  async getUserWallets(req: Request, res: Response) {
    try {
      const { id }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;

      const userWallets = await WalletModel.find({ user: id }).populate(
        'expensesSum incomeSum'
      );
      const walletsToSend = userWallets.map((wallet) => {
        return {
          id: wallet.id,
          name: wallet.name,
          currency: wallet.currency,
          balance: wallet.balance,
        };
      });

      res.send({ data: walletsToSend });
    } catch (err) {
      res.status(400).send({ message: 'Cannot get wallets' });
    }
  }

  async getWallet(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const wallet = await WalletModel.findById(id).populate(
        'expensesSum incomeSum'
      );

      const walletToSend = {
        id: wallet.id,
        name: wallet.name,
        currency: wallet.currency,
        balance: wallet.balance,
      };

      res.send({ data: walletToSend });
    } catch (err) {
      res.status(400).send({ message: `Cannot get wallet with id=${id}` });
    }
  }

  async addWallet(req: Request, res: Response) {
    try {
      const { id }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;
      const { name, currency, amount } = req.body;

      const basicExpenseCategories = await CategoryModel.find(
        {
          basic: true,
          type: MoneyMoveTypes.Expenses,
        },
        'id'
      );
      const basicIncomeCategories = await CategoryModel.find(
        {
          basic: true,
          type: MoneyMoveTypes.Income,
        },
        'id'
      );

      const wallet = new WalletModel({
        name,
        currency,
        initialAmount: amount,
        user: id,
        expenseCategories: basicExpenseCategories,
        incomeCategories: basicIncomeCategories,
      });
      wallet.populate('expensesSum incomeSum');

      await wallet.save();

      await UserModel.findByIdAndUpdate(id, {
        $push: {
          wallets: wallet,
        },
      });

      res.send({
        data: {
          id: wallet.id,
          name: wallet.name,
          currency: wallet.currency,
          balance: wallet.balance,
        },
      });
    } catch (err) {
      res.status(400).send({ message: 'Cannot create wallet' });
    }
  }

  async removeWallet(req: Request, res: Response) {
    const walletId = req.params.id;
    try {
      const { id: userId }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;

      WalletModel.findByIdAndDelete(walletId, async (err: Error) => {
        if (err) {
          res.status(404).send({
            message: 'Cannot remove wallet. Maybe wallet was not found!',
          });
        } else {
          await ExpenseModel.deleteMany({ wallet: walletId });
          await IncomeModel.deleteMany({ wallet: walletId });
          await UserModel.findByIdAndUpdate(userId, {
            $pull: { wallets: walletId },
          });

          res.send({
            message: 'Wallet was deleted successfully!',
          });
        }
      });
    } catch (err) {
      res.status(400).send({
        message: 'Cannot delete wallet',
      });
    }
  }

  async editWallet(req: Request, res: Response) {
    const id = req.params.id;
    try {
      WalletModel.findByIdAndUpdate(id, req.body, (err: Error) => {
        if (err) {
          res.status(404).send({
            message: 'Cannot edit wallet. Maybe wallet was not found!',
          });
        } else {
          res.send({
            message: 'Wallet was edited successfully!',
          });
        }
      });
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit wallet' });
    }
  }
}
