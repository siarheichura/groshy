import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { Expense, ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';

export class ExpensesController {
  async getExpensesByPeriod(req: Request, res: Response) {
    try {
      const { walletId, startDate, finishDate } = req.params;

      if (finishDate) {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.finishDate).endOf('day'),
          },
        });
        res.send({ data: expenses });
      } else {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.startDate).endOf('day'),
          },
        });
        res.send({ data: expenses });
      }
    } catch (err) {
      res.send('Cannot get expenses');
    }
  }

  async addExpense(req: Request, res: Response) {
    const walletId = req.params.id;

    try {
      const { category, amount, comment, date } = req.body;
      const expense = new ExpenseModel({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
      });
      await expense.save();

      await WalletModel.findByIdAndUpdate(walletId, {
        $push: {
          expenses: expense,
        },
      });

      res.send({ data: expense });
    } catch (err) {
      res.status(400).send({ message: 'Cannot add expense' });
    }
  }

  async removeExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;
    const expense = await ExpenseModel.findById(expenseId);
    const { wallet: walletId } = expense;

    try {
      await ExpenseModel.findByIdAndDelete(expenseId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { expenses: expenseId },
      });

      res.send({ data: expense });
    } catch (err) {
      res.status(400).send({ message: 'Cannot remove expense' });
    }
  }

  async editExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;

    try {
      await ExpenseModel.findByIdAndUpdate(expenseId, req.body);
      const updatedExpense = await ExpenseModel.findById(expenseId);
      res.send({ data: updatedExpense });
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit expense' });
    }
  }
}
