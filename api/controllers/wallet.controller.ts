import { ApiError } from './../shared/api.error';
import { Request, Response, NextFunction } from 'express';

import { CategoryModel } from './../models/Category';
import { IncomeModel } from './../models/Income';
import { ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';
import { UserModel } from './../models/User';

import { UserDto } from './../dtos/user.dto';
import { WalletDto } from '../dtos/wallet.dto';
import { tokenService } from './../services/token.service';

export class WalletController {
  async getUserWallets(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { id }: UserDto = tokenService.validateAccessToken(
        token
      ) as UserDto;
      const userWallets = await WalletModel.find({ user: id }).populate(
        'expensesSum incomeSum'
      );
      const wallets = userWallets.map((wallet) => new WalletDto(wallet));
      res.send({ data: wallets });
    } catch (err) {
      next(err);
    }
  }

  async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const wallet = await WalletModel.findById(id).populate(
        'expensesSum incomeSum'
      );
      res.send({ data: new WalletDto(wallet) });
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
          type: category.type,
          name: category.name,
          wallet: wallet.id,
        }).save();
      });

      await UserModel.findByIdAndUpdate(id, {
        $push: {
          wallets: wallet,
        },
      });

      res.send({ data: new WalletDto(wallet) });
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

          res.send({ data: id });
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async editWallet(req: Request, res: Response, next: NextFunction) {
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
      next(err);
      res.status(400).send({ message: 'Cannot edit wallet' });
    }
  }
}
