import { Request, Response } from 'express';
import { WalletModel } from '../models/Wallet';

export class WalletController {
  async getWallets(req: Request, res: Response) {
    try {
      const wallets = await WalletModel.find();
      res.json(wallets);
    } catch (err) {
      res.status(500).json({ message: 'Cannot get wallets' });
    }
  }

  async getWallet(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const wallet = await WalletModel.findById(id);
      res.send(wallet);
    } catch (err) {
      res.status(404).send({ message: `Wallet with id=${id} is not found` });
    }
  }

  async addWallet(req: Request, res: Response) {
    try {
      const { name, currency, amount } = req.body;
      const wallet = new WalletModel({ name, currency, amount });
      await wallet.save();
      return res.json({ message: 'Wallet has been created' });
    } catch (err) {
      res.status(500).json({ message: 'Cannot create wallet' });
    }
  }

  async removeWallet(req: Request, res: Response) {
    const id = req.params.id;

    try {
      WalletModel.findByIdAndDelete(id, (err: Error) => {
        if (err) {
          res.status(404).send({
            message: `Cannot remove wallet with id=${id}. Maybe wallet was not found!`,
          });
        } else {
          res.send({
            message: `Wallet with id=${id} was deleted successfully!`,
          });
        }
      });
    } catch (err) {
      res.status(500).send({
        message: `Cannot delete wallet with id=${id}`,
      });
    }
  }

  async editWallet(req: Request, res: Response) {
    const id = req.params.id;
    try {
      WalletModel.findByIdAndUpdate(id, req.body, (err: Error) => {
        if (err) {
          res.status(404).json({
            message: `Cannot edit wallet with id=${id}. Maybe wallet was not found!`,
          });
        } else {
          res.json({
            message: `Wallet with id=${id} was edited successfully!`,
          });
        }
      });
    } catch (err) {
      res.status(500).json({ message: `Cannot edit wallet with id=${id}` });
    }
  }
}
