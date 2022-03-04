import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';
import { Request, Response } from 'express';
import { WalletModel } from '../models/Wallet';
import { CategoryModel } from './../models/Category';

export class CategoryController {
  async getBasicCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryModel.find({ basic: true }, 'name type');

      res.send({ data: categories });
    } catch (err) {
      res.status(400).send({ message: 'Cannot get basic categories' });
    }
  }

  async getWalletCategories(req: Request, res: Response) {
    const { walletId, type } = req.params;

    try {
      const categories = await CategoryModel.find({
        type: type,
        wallet: walletId,
      });
      res.send({ data: categories });
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
