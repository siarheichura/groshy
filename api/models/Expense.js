const { Schema, model } = require("mongoose");

const Expense = new Schema({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

module.exports = model("Expense", Expense);
