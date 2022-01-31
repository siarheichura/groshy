import express from 'express';
import { WalletController } from './../controllers/wallet.controller';

export const router = express.Router();
const controller = new WalletController();

const path: string = '/wallets';

router.get(path, controller.getWallets);
router.post(path, controller.addWallet);
router.delete(`${path}/:id`, controller.removeWallet);
router.put(`${path}/:id`, controller.editWallet);
