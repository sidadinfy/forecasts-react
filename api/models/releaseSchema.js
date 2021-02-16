const mongoose = require("mongoose");
const releaseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_category: { type: String, required: true },
  sku_code: {
    type: String,
    required: true,
    index: { unique: true },
    minlength: [6, "Minimun code length 6 characters"],
  },
  uom: {
    type: String,
    required: true,
    minlength: [2, "Minimun code length 2 characters"],
  },
  lead_time: { type: String, required: true },
  sourcing_location: { type: String, required: true },
  days_of_stock: { type: Number, required: true, default: 0 },
  intransit_inventory_days: { type: Number, required: true, default: 0 },
  forecast_demand: { type: Number, required: true, default: 0 },
  recommended_order: { type: Number, required: true, default: 0 },
  revised_order_qty: { type: Number, default: 0 },
});

module.exports = mongoose.model("Release", releaseSchema);
