const { Schema, model } = require("mongoose");

const Wallet = new Schema({
  name: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  expenses: { type: Array, ref: "Expense", default: [] },
  income: { type: Array, ref: "Income", default: [] },
});

module.exports = model("Wallet", Wallet);
