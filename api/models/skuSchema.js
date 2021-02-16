const mongoose = require("mongoose");
const skuSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    required: true,
    index: { unique: true },
    minlength: [6, "Minimun code length 6 characters"],
  },
  name: { type: String, required: true },
});

module.exports = mongoose.model("SKU", skuSchema);
