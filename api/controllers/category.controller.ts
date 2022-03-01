import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';
import { Request, Response } from 'express';
import { WalletModel } from '../models/Wallet';
import { CategoryModel } from './../models/Category';

export class CategoryController {
  async getWalletCategories(req: Request, res: Response) {
    const { walletId, type } = req.params;

    try {
      if (type === MoneyMoveTypes.Expenses) {
        const wallet = await WalletModel.findById(walletId).populate(
          'expenseCategories',
          'name'
        );
        res.send(wallet.expenseCategories);
      } else if (type === MoneyMoveTypes.Income) {
        const wallet = await WalletModel.findById(walletId).populate(
          'incomeCategories',
          'name'
        );
        res.send(wallet.incomeCategories);
      }
    } catch (err) {
      res.status(400).send({ message: 'Cannot get wallet categories' });
    }
  }

  async addCategory(req: Request, res: Response) {
    const { name, type } = req.body;

    try {
      const category = new CategoryModel({ name, type });
      category.save();
      res.send(category);
    } catch (err) {
      res.status(400).send({ message: 'Cannot add category' });
    }
  }
}
