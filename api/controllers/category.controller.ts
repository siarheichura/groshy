import { NextFunction, Request, Response } from 'express';
import { CategoryDto } from './../dtos/category.dto';
import { CategoryModel } from './../models/Category';

export class CategoryController {
  async getWalletCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId } = req.params;
      const categories = await CategoryModel.find({
        wallet: walletId,
      });
      const categoriesDto = categories.map(
        (category) => new CategoryDto(category)
      );

      res.send({ data: categoriesDto });
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
      res.send({ data: new CategoryDto(category) });
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
