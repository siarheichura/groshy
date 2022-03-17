import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import { ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';
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
            $gte: dayjs(startDate).startOf('day'),
            $lt: dayjs(finishDate).endOf('day'),
          },
        });
        const expensesDto = expenses.map(
          (expense) => new MoneyMoveDto(expense)
        );
        res.send({ data: expensesDto });
      } else {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(startDate).startOf('day'),
            $lt: dayjs(startDate).endOf('day'),
          },
        });
        const expensesDto = expenses.map(
          (expense) => new MoneyMoveDto(expense)
        );
        res.send({ data: expensesDto });
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

      res.send({ data: result });
    } catch (err) {
      next(err);
    }
  }

  async addExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const walletId = req.params.id;
      const { category, amount, comment, date } = req.body;
      const expense = new ExpenseModel({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
      });
      await expense.save();
      const expenseDto = new MoneyMoveDto(expense);

      await WalletModel.findByIdAndUpdate(walletId, {
        $push: {
          expenses: expense,
        },
      });

      res.send({ data: expenseDto });
    } catch (err) {
      next(err);
    }
  }

  async removeExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const expenseId = req.params.expenseId;
      const expense = await ExpenseModel.findById(expenseId);
      const { wallet: walletId } = expense;
      await ExpenseModel.findByIdAndDelete(expenseId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { expenses: expenseId },
      });
      const expenseDto = new MoneyMoveDto(expense);
      res.send({ data: expenseDto });
    } catch (err) {
      next(err);
    }
  }

  async editExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const expenseId = req.params.expenseId;
      await ExpenseModel.findByIdAndUpdate(expenseId, req.body);
      const updatedExpense = await ExpenseModel.findById(expenseId);
      const expenseDto = new MoneyMoveDto(updatedExpense);
      res.send({ data: expenseDto });
    } catch (err) {
      next(err);
    }
  }
}
