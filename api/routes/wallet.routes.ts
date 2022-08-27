import express from 'express'
import { WalletController } from '../controllers/wallet.controller'
import { ROUTER_ENUM } from '../shared/enums/Router.enum'
import { authMiddleware } from "../middleware/auth.middleware"

export const walletRouter = express.Router()
const controller = new WalletController()

walletRouter.get(`${ROUTER_ENUM.WALLETS}${ROUTER_ENUM.USER_ID}`, authMiddleware, controller.getUserWallets)
walletRouter.get(  `${ROUTER_ENUM.WALLET}${ROUTER_ENUM.WALLET_ID}`, controller.getWallet)
walletRouter.post(`${ROUTER_ENUM.WALLET}${ROUTER_ENUM.USER_ID}`, controller.addWallet)
walletRouter.delete(`${ROUTER_ENUM.WALLET}${ROUTER_ENUM.WALLET_ID}`, controller.deleteWallet)
walletRouter.put(`${ROUTER_ENUM.WALLET}${ROUTER_ENUM.WALLET_ID}`, controller.editWallet)
