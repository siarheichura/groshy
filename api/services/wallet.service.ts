import { Types } from 'mongoose'

import { WalletModel } from '../models/Wallet'
import { WalletDto } from '../dtos/wallet.dto'
import { Wallet, WalletCreate } from '../shared/interfaces/Wallet'
import { OPERATORS_ENUM } from '../shared/enums/Operators.enum'
import { operationService } from './operation.service'
import { ERROR_CODES } from '../shared/enums/ErrorCodes.enum'

class WalletService {
  async getUserWallets(userId: string) {
    try {
      const wallets = await WalletModel.find({ user: userId })
      const walletsDto = wallets.map((wallet) => new WalletDto(wallet))
      return walletsDto
    } catch (err) {
      throw { error_code: ERROR_CODES.GET_USER_WALLETS }
    }
  }

  async getWallet(walletId: string) {
    try {
      const wallet = await WalletModel.findById(walletId)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      throw { error_code: ERROR_CODES.GET_WALLET }
    }
  }

  async addWallet(body: WalletCreate) {
    try {
      const wallet = await WalletModel.create(body)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      throw { error_code: ERROR_CODES.ADD_WALLET }
    }
  }

  async deleteWallet(walletId: string) {
    try {
      const wallet = await WalletModel.findByIdAndDelete(walletId)
      await operationService.deleteAllWalletOperations(walletId)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      throw { error_code: ERROR_CODES.DELETE_WALLET }
    }
  }

  async editWallet(walletId: string, updatedWallet: Wallet) {
    try {
      const wallet = await WalletModel.findByIdAndUpdate(walletId, updatedWallet)
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      throw { error_code: ERROR_CODES.EDIT_WALLET }
    }
  }

  async updateWalletBalance(walletId: string | Types.ObjectId, value: number, type: OPERATORS_ENUM) {
    try {
      const wallet = await WalletModel.findById(walletId)
      await wallet.update({ balance: type === OPERATORS_ENUM.INCREASE ? wallet.balance + value : wallet.balance - value })
      const walletDto = new WalletDto(wallet)
      return walletDto
    } catch (err) {
      throw { error_code: ERROR_CODES.UPDATE_WALLET_BALANCE }
    }
  }
}

export const walletService = new WalletService()
