const Wallet = require("../models/Wallet");

class WalletController {
  async addWallet(req, res) {
    try {
      const { name, currency, amount } = req.body;
      const wallet = new Wallet({ name, currency, amount });
      await wallet.save();
    } catch (err) {
      res.status(500).json({ message: "Cannot create wallet" });
    }
  }

  async getWallets(req, res) {
    try {
      const wallets = await Wallet.find();
      res.json(wallets);
    } catch (err) {
      res.status(500).json({ message: "Cannot get wallets" });
    }
  }

  async removeWallet(req, res) {
    try {
      const id = req.params.id;

      Wallet.findByIdAndDelete(id, (err) => {
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
      res.status(500).send({
        message: `Cannot delete wallet with id=${id}`,
      });
    }
  }
}

module.exports = new WalletController();
