import { Request, Response, NextFunction } from 'express'
import { walletService } from '../services/wallet.service'

export class WalletController {
  async getUserWallets(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const wallets = await walletService.getUserWallets(userId)
      res.json({ data: wallets })
    } catch (err) {
      next(err)
    }
  }

  async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId } = req.params
      const wallet = await walletService.getWallet(walletId)
      res.json({ data: wallet })
    } catch (err) {
      next(err)
    }
  }

  async addWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId: user } = req.params
      const { name, currency, balance } = req.body
      const wallet = await walletService.addWallet({name, currency, balance, user})
      res.send({ data: wallet })
    } catch (err) {
      next(err)
    }
  }

  async deleteWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId } = req.params
      const wallet = await walletService.deleteWallet(walletId)
      res.json({
        data: wallet,
        message: `Wallet ${wallet.name} was deleted`
      })
    } catch (err) {
      next(err)
    }
  }

  async editWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletId } = req.params
      const updatedWallet = req.body
      const wallet = await walletService.editWallet(walletId, updatedWallet)
      res.json({
        data: wallet,
        message: `Wallet ${wallet.name} was updated`
      })
    } catch (err) {
      next(err)
    }
  }
}
