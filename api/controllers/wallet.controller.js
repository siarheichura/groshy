const Wallet = require("../models/Wallet");

class WalletController {
  async getWallets(req, res) {
    try {
      const wallets = await Wallet.find();
      res.json(wallets);
    } catch (err) {
      res.status(500).json({ message: "Cannot get wallets" });
    }
  }

  async addWallet(req, res) {
    try {
      const { name, currency, amount } = req.body;
      const wallet = new Wallet({ name, currency, amount });
      await wallet.save();
      return res.json({ message: "Wallet has been created" });
    } catch (err) {
      res.status(500).json({ message: "Cannot create wallet" });
    }
  }

  async removeWallet(req, res) {
    const id = req.params.id;

    try {
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

  async editWallet(req, res) {
    const id = req.params.id;
    try {
      Wallet.findByIdAndUpdate(id, req.body, (err) => {
        if (err) {
          res.status(404).json({
            message: `Cannot edit wallet with id=${id}. Maybe wallet was not found!`,
          });
        } else {
          res.json({
            message: `Wallet with id=${id} was edited successfully!`,
          });
        }
      });
    } catch (err) {
      res.status(500).json({ message: `Cannot edit wallet with id=${id}` });
    }
  }
}

module.exports = new WalletController();
