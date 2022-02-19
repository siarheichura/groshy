import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { Income, IncomeModel } from './../models/Income';
import { WalletModel } from '../models/Wallet';

export class IncomeController {
  async getIncomeByPeriod(req: Request, res: Response) {
    try {
      const { walletId, startDate, finishDate } = req.params;

      if (finishDate) {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.finishDate).endOf('day'),
          },
        });
        res.send(income);
      } else {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.startDate).endOf('day'),
          },
        });
        res.send(income);
      }
    } catch (err) {
      res.send('Cannot get income');
    }
  }

  async addIncome(req: Request, res: Response) {
    const walletId = req.params.id;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

    try {
      const { category, amount, comment, date } = req.body;
      const income = new IncomeModel({
        category,
        amount,
        comment,
        date,
        wallet: walletId,
      });
      await income.save();

      await WalletModel.findByIdAndUpdate(walletId, {
        $push: {
          income: income,
        },
        $set: { amount: walletAmount + amount },
      });
      return res.json({ message: 'Income has been added' });
    } catch (err) {
      res.status(400).json({ message: 'Cannot add income' });
    }
  }

  async removeIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;
    const income = await IncomeModel.findById(incomeId);
    const { wallet: walletId, amount: incomeAmount } = income;
    const { amount: walletAmount } = await WalletModel.findById(walletId);

    try {
      await IncomeModel.findByIdAndDelete(incomeId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { income: incomeId },
        $set: { amount: walletAmount - incomeAmount },
      });

      res.send(income);
    } catch (err) {
      res.status(400).send({ message: 'Cannot remove income' });
    }
  }

  async editIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;
    const { wallet: walletId, amount: incomeAmount } =
      await IncomeModel.findById(incomeId);
    const { amount: walletAmount } = await WalletModel.findById(walletId);

    try {
      await IncomeModel.findByIdAndUpdate(incomeId, req.body);
      const updatedExpense = await IncomeModel.findById(incomeId);

      if (req.body.amount !== incomeAmount) {
        await WalletModel.findByIdAndUpdate(walletId, {
          $set: { amount: walletAmount - incomeAmount + req.body.amount },
        });
      }

      res.send(updatedExpense);
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit income' });
    }
  }
}
