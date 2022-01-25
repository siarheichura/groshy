const Wallet = require("../models/Wallet");

class WalletController {
  async addWallet(req, res) {
    try {
      const { name, currency, amount } = req.body;
      const wallet = new Wallet({ name, currency, amount });
      await wallet.save();
      return res.json({ message: "Wallet has been created" });
    } catch (err) {
      console.log(err);
    }
  }

  async getWallets(req, res) {
    try {
      const wallets = await Wallet.find();
      res.json(wallets);
    } catch (err) {
      console.log(err);
    }
  }

  async removeWallet(req, res) {
    try {
      const id = req.params.id;

      Wallet.findByIdAndDelete(id, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            message: `Wallet with id: ${id} was deleted successfully!`,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new WalletController();
