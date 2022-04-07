import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';

import { ExpenseModel } from './../models/Expense';
import { MoneyMoveDto } from '../dtos/money-move.dto';

export class ExpensesController {
  async getExpensesByPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId, startDate, finishDate } = req.params;
      if (finishDate) {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate),
            $lt: dayjs(finishDate),
          },
        });
        const expensesDto = expenses.map(
          (expense) => new MoneyMoveDto(expense)
        );
        res.json({ data: expensesDto });
      } else {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate),
            $lt: dayjs(startDate),
          },
        });
        const expensesDto = expenses.map(
          (expense) => new MoneyMoveDto(expense)
        );
        res.json({ data: expensesDto });
      }
    } catch (err) {
      next(err);
    }
  }

  async getExpensesByCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { walletId, startDate, finishDate } = req.params;
      const expenses = await ExpenseModel.find({
        wallet: walletId,
        date: {
          $gte: dayjs(startDate),
          $lt: dayjs(finishDate),
        },
      });

      const categories: string[] = [];
      expenses.forEach((item) => {
        if (!categories.includes(item.category)) {
          categories.push(item.category);
        }
      });

      const result = categories
        .map((category) => {
          const amount = expenses
            .filter((item) => item.category === category)
            .reduce((prev, curr) => prev + curr.amount, 0);
          return { category, amount };
        })
        .sort((a, b) => b.amount - a.amount);

      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  async addExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.id;
      const { category, amount, comment, date, checkBase64 } = req.body;

      const expense = await ExpenseModel.create({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
        checkBase64,
      });

      res.json({ data: new MoneyMoveDto(expense) });
    } catch (err) {
      next(err);
    }
  }

  async removeExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const expenseId = req.params.expenseId;
      const expense = await ExpenseModel.findById(expenseId);
      await ExpenseModel.findByIdAndDelete(expenseId);
      res.json({ data: new MoneyMoveDto(expense) });
    } catch (err) {
      next(err);
    }
  }

  async editExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const expenseId = req.params.expenseId;
      const expense = await ExpenseModel.findByIdAndUpdate(expenseId, req.body);
      res.json({ data: new MoneyMoveDto(expense) });
    } catch (err) {
      next(err);
    }
  }
}
