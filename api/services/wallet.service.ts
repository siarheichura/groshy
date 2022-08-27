import { WalletModel } from '../models/Wallet'
import { WalletDto } from '../dtos/wallet.dto'
import { Wallet, WalletCreate } from '../shared/interfaces/Wallet'
import { Types } from 'mongoose'
import { OPERATORS_ENUM } from '../shared/enums/Operators.enum'

class WalletService {
  async getUserWallets(userId: string) {
    const wallets = await WalletModel.find({ user: userId })
    const walletsDto = wallets.map((wallet) => new WalletDto(wallet))
    return walletsDto
  }

  async getWallet(walletId: string) {
    try {
      const wallet = await WalletModel.findById(walletId)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      console.log('WalletService | getWallet')
    }
  }

  async addWallet(body: WalletCreate) {
    try {
      const wallet = await WalletModel.create(body)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      console.log('WalletService | addWallet')
    }
  }

  // Add delete all operations and all ??categories?? in this wallet
  async deleteWallet(walletId: string) {
    try {
      const wallet = await WalletModel.findByIdAndDelete(walletId)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      console.log('WalletService | deleteWallet')
    }
  }

  async editWallet(walletId: string, updatedWallet: Wallet) {
    try {
      const wallet = await WalletModel.findByIdAndUpdate(walletId, updatedWallet)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      console.log('WalletService | editWallet')
    }
  }

  async updateWalletBalance(walletId: string | Types.ObjectId, value: number, type: OPERATORS_ENUM) {
    const wallet = await WalletModel.findById(walletId)
    await wallet.update({ balance: type === OPERATORS_ENUM.INCREASE ? wallet.balance + value : wallet.balance - value })
    const walletDto = new WalletDto(wallet)
    return walletDto
  }
}

export const walletService = new WalletService()
