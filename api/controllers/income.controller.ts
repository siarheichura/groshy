import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { Income, IncomeModel } from './../models/Income';
import { WalletModel } from '../models/Wallet';

export class IncomeController {
  async getIncomeByDay(req: Request, res: Response) {
    const walletId = req.params.id;
    const date = dayjs(req.params.date);

    try {
      const walletIncome: Income[] = await IncomeModel.find({
        wallet: walletId,
      });
      const incomeByDay = walletIncome.filter((income) =>
        dayjs(income.date).isSame(date, 'day')
      );

      res.send(incomeByDay);
    } catch (err) {
      res.status(404).send({ message: 'Cannot get income by day', err });
    }
  }

  async getIncomeByMonth(req: Request, res: Response) {
    const walletId = req.params.id;
    const date = dayjs(req.params.date);

    try {
      const walletIncome: Income[] = await IncomeModel.find({
        wallet: walletId,
      });
      const incomeByMonth = walletIncome.filter((income) =>
        dayjs(income.date).isSame(date, 'month')
      );
      res.send(incomeByMonth);
    } catch (err) {
      res.status(404).send({ message: 'Cannot get income by month', err });
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

      await WalletModel.updateOne(
        { _id: walletId },
        {
          $push: {
            income: income,
          },
          $set: { amount: walletAmount + amount },
        }
      );
      return res.json({ message: 'Income has been added' });
    } catch (err) {
      res.status(500).json({ message: 'Cannot add income' });
    }
  }

  async removeIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;
    const walletId = req.params.walletId;
    const incomeAmount = (await IncomeModel.findById(incomeId)).amount;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

    try {
      await IncomeModel.findByIdAndDelete(incomeId);
      await WalletModel.findByIdAndUpdate(walletId, {
        $pull: { income: incomeId },
        $set: { amount: walletAmount - incomeAmount },
      });
      res.send({ message: 'success' });
    } catch (err) {
      res.send(err);
    }
  }

  async editIncome(req: Request, res: Response) {
    const incomeId = req.params.incomeId;
    const walletId = req.params.walletId;
    const incomeAmount = (await IncomeModel.findById(incomeId)).amount;
    const walletAmount = (await WalletModel.findById(walletId)).amount;

    try {
      await IncomeModel.findByIdAndUpdate(incomeId, req.body);

      if (req.body.amount !== incomeAmount) {
        await WalletModel.findByIdAndUpdate(walletId, {
          $set: { amount: walletAmount - incomeAmount + req.body.amount },
        });
      }

      res.send(req.body);
    } catch (err) {
      res.send(err);
    }
  }
}
