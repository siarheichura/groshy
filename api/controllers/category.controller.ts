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
    const { walletId } = req.params;

    try {
      const categories = await CategoryModel.find({
        wallet: walletId,
      });
      res.send({ data: categories });
    } catch (err) {
      res.status(400).send({ message: 'Cannot get wallet categories' });
    }
  }

  async addCategory(req: Request, res: Response) {
    const { name, type } = req.body;
    const { walletId } = req.params;

    try {
      const category = new CategoryModel({ name, type, wallet: walletId });
      category.save();
      res.send({ data: category });
    } catch (err) {
      res.status(400).send({ message: 'Cannot add category' });
    }
  }

  async removeCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await CategoryModel.findByIdAndDelete(id);
      res.send({ data: id });
    } catch (err) {
      res.status(400).send({ message: 'Cannot remove category' });
    }
  }
}
