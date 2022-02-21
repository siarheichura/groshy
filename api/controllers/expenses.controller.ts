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
        res.send(expenses);
      } else {
        const expenses = await ExpenseModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.startDate).endOf('day'),
          },
        });
        res.send(expenses);
      }
    } catch (err) {
      res.send('Cannot get expenses');
    }
  }

  async getExpense(req: Request, res: Response) {
    const expenseId = req.params.id;
    try {
      const expense = await ExpenseModel.findById(expenseId);
      res.send(expense);
    } catch (err) {
      res.status(400).send({ message: `Cannot get expense` });
    }
  }

  async addExpense(req: Request, res: Response) {
    const walletId = req.params.id;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

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
        $set: { amount: walletAmount - amount },
      });

      res.send(expense);
    } catch (err) {
      res.status(400).send({ message: 'Cannot add expense' });
    }
  }

  async removeExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;
    const expense = await ExpenseModel.findById(expenseId);
    const { wallet: walletId, amount: expenseAmount } = expense;
    const { amount: walletAmount } = await WalletModel.findById(walletId);

    try {
      await ExpenseModel.findByIdAndDelete(expenseId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { expenses: expenseId },
        $set: { amount: walletAmount + expenseAmount },
      });

      res.send(expense);
    } catch (err) {
      res.status(400).send({ message: 'Cannot remove expense' });
    }
  }

  async editExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;
    const { wallet: walletId, amount: expenseAmount } =
      await ExpenseModel.findById(expenseId);
    const { amount: walletAmount } = await WalletModel.findById(walletId);

    try {
      await ExpenseModel.findByIdAndUpdate(expenseId, req.body);
      const updatedExpense = await ExpenseModel.findById(expenseId);

      if (req.body.amount !== expenseAmount) {
        await WalletModel.findByIdAndUpdate(walletId, {
          $set: { amount: walletAmount + expenseAmount - req.body.amount },
        });
      }

      res.send(updatedExpense);
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit expense' });
    }
  }
}
