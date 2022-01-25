const Router = require("express");
const router = new Router();
const controller = require("../controllers/wallet.controller");

router.get("/wallets", controller.getWallets);
router.post("/wallets", controller.addWallet);
router.delete("/wallets/:id", controller.removeWallet);

module.exports = router;
