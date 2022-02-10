import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';

export class ExpensesController {
  async getExpensesForInitialDisplay(req: Request, res: Response) {
    const walletId = req.params.id;
    const today = dayjs();
    const yesterday = dayjs(dayjs().date(today.date() - 1));

    try {
      const walletExpenses = await ExpenseModel.find({ wallet: walletId });
      const todayExpenses = walletExpenses.filter((expense) => {
        return dayjs(expense.date).isSame(today, 'day');
      });
      const yesterdayExpenses = walletExpenses.filter((expense) => {
        return dayjs(expense.date).isSame(yesterday, 'day');
      });

      res.send({
        today: todayExpenses,
        yesterday: yesterdayExpenses,
      });
    } catch (err) {
      res.status(404).send({ message: 'Cannot get init expenses', err });
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

      await WalletModel.updateOne(
        { _id: walletId },
        {
          $push: {
            expenses: expense,
          },
        }
      );
      return res.json({ message: 'Expense has been added' });
    } catch (err) {
      res.status(500).json({ message: 'Cannot add expense' });
    }
  }
}
