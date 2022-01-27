const Router = require("express");
const router = new Router();
const controller = require("../controllers/wallet.controller");

const path = "/wallets";

router.get(path, controller.getWallets);
router.post(path, controller.addWallet);
router.delete(`${path}/:id`, controller.removeWallet);
router.put(`${path}/:id`, controller.editWallet);

module.exports = router;
