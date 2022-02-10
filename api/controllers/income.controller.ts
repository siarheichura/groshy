import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { IncomeModel } from './../models/Income';
import { WalletModel } from '../models/Wallet';

export class IncomeController {
  async getIncomeForInitialDisplay(req: Request, res: Response) {
    const walletId = req.params.id;
    const today = dayjs();
    const yesterday = dayjs(dayjs().date(today.date() - 1));

    try {
      const walletIncome = await IncomeModel.find({ wallet: walletId });
      const todayIncome = walletIncome.filter((income) => {
        return dayjs(income.date).isSame(today, 'day');
      });
      const yesterdayIncome = walletIncome.filter((income) => {
        return dayjs(income.date).isSame(yesterday, 'day');
      });

      res.send({
        today: todayIncome,
        yesterday: yesterdayIncome,
      });
    } catch (err) {
      res.status(404).send({ message: 'Cannot get init income' });
    }
  }

  async addWalletIncome(req: Request, res: Response) {
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

      await WalletModel.updateOne(
        { _id: walletId },
        {
          $push: {
            income: income,
          },
        }
      );
      return res.json({ message: 'Income has been added' });
    } catch (err) {
      res.status(500).json({ message: 'Cannot add income' });
    }
  }
}
