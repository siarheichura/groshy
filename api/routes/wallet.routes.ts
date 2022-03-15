import { authMiddleware } from './../middleware/auth.middleware';
import express from 'express';
import { WalletController } from './../controllers/wallet.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const walletRouter = express.Router();
const controller = new WalletController();

walletRouter.get(RouterEnum.Wallets, authMiddleware, controller.getUserWallets);
walletRouter.get(
  `${RouterEnum.Wallets}/:id`,
  authMiddleware,
  controller.getWallet
);
walletRouter.post(RouterEnum.Wallets, authMiddleware, controller.addWallet);
walletRouter.delete(
  `${RouterEnum.Wallets}/:id`,
  authMiddleware,
  controller.removeWallet
);
walletRouter.put(
  `${RouterEnum.Wallets}/:id`,
  authMiddleware,
  controller.editWallet
);
