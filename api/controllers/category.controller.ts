import { NextFunction, Request, Response } from 'express'
import { categoryService } from '../services/category.service'

export class CategoryController {
  async getBasicCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params
      const categories = await categoryService.getBasicCategories(type)
      res.send({ data: categories })
    } catch (err) {
      next(err)
    }
  }

  async getUserCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params
      const userId = req.headers.user as string
      const categories = await categoryService.getUserCategories(userId, type)
      res.send({ data: categories })
    } catch (err) {
      next(err)
    }
  }

  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.headers.user as string
      const { name, type, emoji } = req.body
      const category = categoryService.addCategory({ name, type, emoji, user: userId })
      res.send({ data: category })
    } catch (err) {
      next(err)
    }
  }

  async editCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params
      const { name, type, emoji } = req.body
      const category = categoryService.editCategory(categoryId, { name, type, emoji })
      res.send({ data: category })
    } catch (err) {
      next(err)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params
      const category = categoryService.deleteCategory(categoryId)
      res.send({ data: category })
    } catch (err) {
      next(err)
    }
  }
}
