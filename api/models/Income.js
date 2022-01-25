const { Schema, model } = require("mongoose");

const Income = new Schema({
  category: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number },
});

module.exports = model("Income", Income);
