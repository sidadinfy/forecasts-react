const mongoose = require("mongoose");
const maintainSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_category: { type: String, required: true },
  sku_code: { type: String, required: true },
  uom: { type: String, required: true },
  period: { type: Date, required: true },
  stats_forecast: { type: Number, default: 10 },
  rec_forecast: { type: Number, default: 0 },
});

module.exports = mongoose.model("Maintain", maintainSchema);
