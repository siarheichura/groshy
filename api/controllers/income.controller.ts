import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import { IncomeModel } from './../models/Income';
import { WalletModel } from '../models/Wallet';
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
        res.send({ data: incomeDto });
      } else {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate),
            $lt: dayjs(startDate),
          },
        });
        const incomeDto = income.map((income) => new MoneyMoveDto(income));
        res.send({ data: incomeDto });
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
          $gte: dayjs(startDate).startOf('day'),
          $lt: dayjs(finishDate).endOf('day'),
        },
      });

      const result = categories.map((category) => {
        const amount = income
          .filter((item) => item.category === category.name)
          .reduce((prev, curr) => prev + curr.amount, 0);

        return { category, amount };
      });

      res.send({ data: result });
    } catch (err) {
      next(err);
    }
  }

  async addIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.id;
      const { category, amount, comment, date } = req.body;
      const income = new IncomeModel({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
      });
      await income.save();
      const incomeDto = new MoneyMoveDto(income);

      await WalletModel.findByIdAndUpdate(walletId, {
        $push: {
          income: income,
        },
      });
      return res.send({ data: incomeDto });
    } catch (err) {
      next(err);
    }
  }

  async removeIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const incomeId = req.params.incomeId;
      const income = await IncomeModel.findById(incomeId);
      const { wallet: walletId } = income;
      await IncomeModel.findByIdAndDelete(incomeId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { income: incomeId },
      });
      const incomeDto = new MoneyMoveDto(income);
      res.send({ data: incomeDto });
    } catch (err) {
      next(err);
    }
  }

  async editIncome(req: Request, res: Response, next: NextFunction) {
    try {
      const incomeId = req.params.incomeId;
      await IncomeModel.findByIdAndUpdate(incomeId, req.body);
      const updatedExpense = await IncomeModel.findById(incomeId);
      const incomeDto = new MoneyMoveDto(updatedExpense);
      res.send({ data: incomeDto });
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
        res.send({ data: new Date() });
      } else {
        const firstIncomeDate = income[0].date;
        res.send({ data: firstIncomeDate });
      }
    } catch (err) {
      next(err);
    }
  }
}
