const mongoose = require("mongoose");
const masterSKUSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_category: { type: String, required: true },
  sku_code: { type: String, required: true, index: { unique: true } },
  sku_description: { type: String, required: true },
  sourcing_location: { type: String, required: true },
  uom: { type: String, required: true },
  abc_class: { type: String, required: true },
  xyz_class: { type: String, required: true },
  movement_class: { type: String, required: true },
  purchase_price: { type: String, required: true },
  sell_price: { type: Number, required: true, default: 0 },
  margin: { type: Number, required: true, default: 0 },
  moq: { type: Number, required: true, default: 0 },
  soh: { type: Number, required: true, default: 0 },
  soh_days: { type: Number, default: 0 },
  avg_demand_per_day: { type: Number, default: 0 },
  stock_value: { type: Number, default: 0 },
  stock_transit: { type: Number, default: 0 },
  open_po_qty: { type: Number, default: 0 },
  open_so_qty: { type: Number, default: 0 },
  lead_time_in_days: { type: Number, default: 0 },
  roq_units: { type: Number, default: 0 },
  safety_stock_units: { type: Number, default: 0 },
  min_units: { type: Number, default: 0 },
  max_units: { type: Number, default: 0 },
  tm_forecast_accuracy: { type: Number, default: 0 },
  shortage_units: { type: Number, default: 0 },
  excess_units: { type: Number, default: 0 },
  target_fill: { type: Number, default: 0 },
  actual_fill: { type: Number, default: 0 },
});

module.exports = mongoose.model("MasterSKU", masterSKUSchema);

/*
id: 20,
            category: "Detergents",
            sku: "ABC293",
            sku_description: "ABC293",
            sourcing_location: "Mumbai MH",
            uom: "Case",
            abc_class: "B",
            xyz_class: "Y",
            movement_class: "Moderately Moving",
            purchase_price: "$193.22",
            sell_price: "$323.30",
            margin: 75.47,
            moq: 14,
            soh: 876,
            soh_days: 2,
            avg_demand_per_day: 115.2,
            stock_value: 1159,
            stock_transit: 70,
            open_po_qty: 186,
            open_so_qty: 368,
            lead_time_in_days: 6,
            roq_units: 87,
            safety_stock_units: 466,
            min_units: 354,
            max_units: 1298,
            tm_forecast_accuracy: 54.4,
            shortage_units: 115.9,
            excess_units: 16,
            target_fill: 76,
            actual_fill: 56,
*/