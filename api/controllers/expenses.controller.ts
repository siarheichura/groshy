import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';

import { ExpenseModel } from './../models/Expense';
import { CategoryModel } from './../models/Category';
import { MoneyMoveDto } from '../dtos/money-move.dto';
import { MoneyMoveTypes } from './../shared/enums/MoneyMoveTypes';

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
      const categories = await CategoryModel.find(
        {
          wallet: walletId,
          type: MoneyMoveTypes.Expense,
        },
        'name'
      );
      const expenses = await ExpenseModel.find({
        wallet: walletId,
        date: {
          $gte: dayjs(startDate),
          $lt: dayjs(finishDate),
        },
      });

      const result = categories
        .map((category) => {
          const amount = expenses
            .filter((item) => item.category === category.name)
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
      const { category, amount, comment, date } = req.body;
      const expense = await ExpenseModel.create({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
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

  async getFirstExpenseDate(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.walletId;
      const expense = await ExpenseModel.find({ wallet: walletId }).sort({
        date: 1,
      });
      if (!expense.length) {
        res.json({ data: new Date() });
      } else {
        const firstExpenseDate = expense[0].date;
        res.json({ data: firstExpenseDate });
      }
    } catch (err) {
      next(err);
    }
  }
}
