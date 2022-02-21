import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { WalletModel } from '../models/Wallet';
import { UserModel } from './../models/User';

interface JwtPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export class WalletController {
  async getUserWallets(req: Request, res: Response) {
    try {
      const { id }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;
      const userWallets = await WalletModel.find({ user: id });
      res.send(userWallets);
    } catch (err) {
      res.status(400).send({ message: 'Cannot get wallets' });
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
      const { id }: JwtPayload | { id: string } = jwt.decode(
        req.header('token')
      ) as JwtPayload;
      const { name, currency, amount } = req.body;
      const wallet = new WalletModel({ name, currency, amount, user: id });
      await wallet.save();
      await UserModel.findByIdAndUpdate(id, {
        $push: {
          wallets: wallet,
        },
      });
      res.send({
        _id: wallet.id,
        name: wallet.name,
        currency: wallet.currency,
        amount: wallet.amount,
      });
    } catch (err) {
      res.status(400).send({ message: 'Cannot create wallet' });
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
      res.status(400).send({
        message: `Cannot delete wallet with id=${id}`,
      });
    }
  }

  async editWallet(req: Request, res: Response) {
    const id = req.params.id;
    try {
      WalletModel.findByIdAndUpdate(id, req.body, (err: Error) => {
        if (err) {
          res.status(404).send({
            message: `Cannot edit wallet with id=${id}. Maybe wallet was not found!`,
          });
        } else {
          res.send({
            message: `Wallet with id=${id} was edited successfully!`,
          });
        }
      });
    } catch (err) {
      res.status(400).send({ message: `Cannot edit wallet with id=${id}` });
    }
  }
}
