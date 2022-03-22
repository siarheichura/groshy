import { Request, Response, NextFunction } from 'express';

import { CategoryModel } from './../models/Category';
import { IncomeModel } from './../models/Income';
import { ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';
import { UserModel } from './../models/User';

import { ApiError } from './../shared/api.error';
import { UserDto } from './../dtos/user.dto';
import { WalletDto } from '../dtos/wallet.dto';
import { tokenService } from './../services/token.service';

export class WalletController {
  async getUserWallets(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { id } = tokenService.validateAccessToken(token) as UserDto;
      const wallets = await WalletModel.find({ user: id }).populate(
        'expensesSum incomeSum'
      );
      const walletsDto = wallets.map((wallet) => new WalletDto(wallet));
      res.json({ data: walletsDto });
    } catch (err) {
      next(err);
    }
  }

  async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const wallet = await WalletModel.findById(id);
      await wallet.populate('expensesSum incomeSum');
      const walletDto = new WalletDto(wallet);
      res.json({ data: walletDto });
    } catch (err) {
      next(err);
    }
  }

  async addWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { id }: UserDto = tokenService.validateAccessToken(
        token
      ) as UserDto;
      const { name, currency, balance } = req.body;
      const wallet = await WalletModel.create({
        name,
        currency,
        initialAmount: balance,
        balance,
        user: id,
      });
      await wallet.populate('expensesSum incomeSum');

      const categories = await CategoryModel.find({ basic: true });
      categories.forEach((category) => {
        CategoryModel.create({
          type: category.type,
          name: category.name,
          wallet: wallet.id,
        });
      });

      await UserModel.findByIdAndUpdate(id, {
        $push: {
          wallets: wallet,
        },
      });
      res.json({ data: new WalletDto(wallet) });
    } catch (err) {
      next(err);
    }
  }

  async removeWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(' ')[1];
      const { id: userId }: UserDto = tokenService.validateAccessToken(
        token
      ) as UserDto;

      WalletModel.findByIdAndDelete(id, async (err: Error) => {
        if (err) {
          return next(ApiError.NotFound());
        } else {
          await ExpenseModel.deleteMany({ wallet: id });
          await IncomeModel.deleteMany({ wallet: id });
          await CategoryModel.deleteMany({ wallet: id });
          await UserModel.findByIdAndUpdate(userId, {
            $pull: { wallets: id },
          });

          res.json({ data: id });
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async editWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const wallet = await WalletModel.findByIdAndUpdate(id, req.body);
      res.json({ data: wallet });
    } catch (err) {
      next(err);
    }
  }
}
