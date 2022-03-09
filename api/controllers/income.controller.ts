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
        res.send({ data: income });
      } else {
        const income = await IncomeModel.find({
          wallet: walletId,
          date: {
            $gte: dayjs(req.params.startDate).startOf('day'),
            $lt: dayjs(req.params.startDate).endOf('day'),
          },
        });
        res.send({ data: income });
      }
    } catch (err) {
      res.send('Cannot get income');
    }
  }

  async addIncome(req: Request, res: Response) {
    const walletId = req.params.id;

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
      });
      return res.send({ data: income });
    } catch (err) {
      res.status(400).send({ message: 'Cannot add income' });
    }
  }

  async removeIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;
    const income = await IncomeModel.findById(incomeId);
    const { wallet: walletId } = income;

    try {
      await IncomeModel.findByIdAndDelete(incomeId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { income: incomeId },
      });

      res.send({ data: income });
    } catch (err) {
      res.status(400).send({ message: 'Cannot remove income' });
    }
  }

  async editIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;

    try {
      await IncomeModel.findByIdAndUpdate(incomeId, req.body);
      const updatedExpense = await IncomeModel.findById(incomeId);

      res.send({ data: updatedExpense });
    } catch (err) {
      res.status(400).send({ message: 'Cannot edit income' });
    }
  }
}
