import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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
      const { name, currency, balance } = req.body;

      const wallet = new WalletModel({
        name,
        currency,
        initialAmount: balance,
        user: id,
      });
      wallet.populate('expensesSum incomeSum');
      await wallet.save();

      const categories = await CategoryModel.find({ basic: true });
      categories.forEach(async (category) => {
        await new CategoryModel({
          type: category.type.toLowerCase(),
          name: category.name,
          wallet: wallet.id,
        }).save();
      });

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
    const { id } = req.params;
    try {
      const { id: userId }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;

      WalletModel.findByIdAndDelete(id, async (err: Error) => {
        if (err) {
          res.status(404).send({
            message: 'Cannot remove wallet. Maybe wallet was not found!',
          });
        } else {
          await ExpenseModel.deleteMany({ wallet: id });
          await IncomeModel.deleteMany({ wallet: id });
          await CategoryModel.deleteMany({ wallet: id });
          await UserModel.findByIdAndUpdate(userId, {
            $pull: { wallets: id },
          });

          res.send({ data: id });
        }
      });
    } catch (err) {
      res.status(400).send({
        message: 'Cannot delete wallet',
      });
    }
  }

  async editWallet(req: Request, res: Response) {
    const { id } = req.params;
    try {
      WalletModel.findByIdAndUpdate(id, req.body, (err: Error) => {
        if (err) {
          res.status(404).send({
            message: 'Cannot edit wallet. Maybe wallet was not found!',
          });
        } else {
          res.send({ data: id });
        }
      });
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit wallet' });
    }
  }
}
