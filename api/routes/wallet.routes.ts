import express from 'express';
import { WalletController } from './../controllers/wallet.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const walletRouter = express.Router();
const controller = new WalletController();

walletRouter.get(RouterEnum.Wallets, controller.getWallets);
walletRouter.post(RouterEnum.Wallets, controller.addWallet);
walletRouter.delete(`${RouterEnum.Wallets}/:id`, controller.removeWallet);
walletRouter.put(`${RouterEnum.Wallets}/:id`, controller.editWallet);
