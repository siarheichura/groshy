import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { Expense, ExpenseModel } from './../models/Expense';
import { WalletModel } from '../models/Wallet';
import { WalletController } from './wallet.controller';

export class ExpensesController {
  async getExpensesByDay(req: Request, res: Response) {
    const walletId = req.params.id;
    const date = dayjs(req.params.date);

    try {
      const walletExpenses: Expense[] = await ExpenseModel.find({
        wallet: walletId,
      });
      const expensesByDay = walletExpenses.filter((expense) =>
        dayjs(expense.date).isSame(date, 'day')
      );

      res.send(expensesByDay);
    } catch (err) {
      res.status(404).send({ message: 'Cannot get expenses by day', err });
    }
  }

  async getExpensesByMonth(req: Request, res: Response) {
    const walletId = req.params.id;
    const date = dayjs(req.params.date);

    try {
      const walletExpenses: Expense[] = await ExpenseModel.find({
        wallet: walletId,
      });
      const expensesByMonth = walletExpenses.filter((expense) =>
        dayjs(expense.date).isSame(date, 'month')
      );
      res.send(expensesByMonth);
    } catch (err) {
      res.status(404).send({ message: 'Cannot get expenses by month', err });
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

      await WalletModel.updateOne(
        { _id: walletId },
        {
          $push: {
            expenses: expense,
          },
          $set: { amount: walletAmount - amount },
        }
      );

      return res.json({ message: 'Expense has been added' });
    } catch (err) {
      res.status(500).json({ message: 'Cannot add expense' });
    }
  }

  async removeExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;
    const walletId = req.params.walletId;
    const expenseAmount = (await ExpenseModel.findById(expenseId)).amount;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

    try {
      await ExpenseModel.findByIdAndDelete(expenseId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { expenses: expenseId },
        $set: { amount: walletAmount + expenseAmount },
      });
      res.send({ message: 'success' });
    } catch (err) {
      res.send(err);
    }
  }

  async editExpense(req: Request, res: Response) {
    const expenseId = req.params.expenseId;
    const walletId = req.params.walletId;
    const expenseAmount = (await ExpenseModel.findById(expenseId)).amount;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

    try {
      await ExpenseModel.findByIdAndUpdate(expenseId, req.body);

      if (req.body.amount !== expenseAmount) {
        await WalletModel.findByIdAndUpdate(walletId, {
          $set: { amount: walletAmount + expenseAmount - req.body.amount },
        });
      }

      res.send(req.body);
    } catch (err) {
      res.send(err);
    }
  }
}
