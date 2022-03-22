import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';

import { IncomeModel } from './../models/Income';
import { CategoryModel } from './../models/Category';
import { MoneyMoveDto } from './../dtos/money-move.dto';
import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';

export class IncomeController {
  async getIncomeByPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId, startDate, finishDate } = req.params;
      if (finishDate) {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate),
            $lt: dayjs(finishDate),
          },
        });
        const incomeDto = income.map((income) => new MoneyMoveDto(income));
        res.json({ data: incomeDto });
      } else {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate),
            $lt: dayjs(startDate),
          },
        });
        const incomeDto = income.map((income) => new MoneyMoveDto(income));
        res.json({ data: incomeDto });
      }
    } catch (err) {
      next(err);
    }
  }

  async getIncomeByCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId, startDate, finishDate } = req.params;
      const categories = await CategoryModel.find(
        {
          wallet: walletId,
          type: MoneyMoveTypes.Income,
        },
        'name'
      );
      const income = await IncomeModel.find({
        wallet: walletId,
        date: {
          $gte: dayjs(startDate),
          $lt: dayjs(finishDate),
        },
      });

      const result = categories.map((category) => {
        const amount = income
          .filter((item) => item.category === category.name)
          .reduce((prev, curr) => prev + curr.amount, 0);

        return { category, amount };
      });

      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  async addIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.id;
      const { category, amount, comment, date } = req.body;
      const income = await IncomeModel.create({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
      });
      return res.send({ data: new MoneyMoveDto(income) });
    } catch (err) {
      next(err);
    }
  }

  async removeIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const incomeId = req.params.incomeId;
      const income = await IncomeModel.findById(incomeId);
      await IncomeModel.findByIdAndDelete(incomeId);
      res.json({ data: new MoneyMoveDto(income) });
    } catch (err) {
      next(err);
    }
  }

  async editIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const incomeId = req.params.incomeId;
      const income = await IncomeModel.findByIdAndUpdate(incomeId, req.body);
      res.json({ data: new MoneyMoveDto(income) });
    } catch (err) {
      next(err);
    }
  }

  async getFirstIncomeDate(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.walletId;
      const income = await IncomeModel.find({ wallet: walletId }).sort({
        date: 1,
      });
      if (!income.length) {
        res.json({ data: new Date() });
      } else {
        const firstIncomeDate = income[0].date;
        res.json({ data: firstIncomeDate });
      }
    } catch (err) {
      next(err);
    }
  }
}
