const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const ReleaseSchema = require("../models/releaseSchema");

//Test Route
router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Test",
  });
});

//Get All Maintain Data
router.get("/view", (req, res, next) => {
  ReleaseSchema.find()
    .select()
    .exec()
    .then((result) => {
      const response = [...result];
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
});

//Updated Single Forecast ID
router.put("/save/:uom/:sku", (req, res) => {
  const UOM = req.params.uom;
  const sku = req.params.sku;
  const updateOPS = {};
  if (/\D/gim.test(UOM)) {
  } else {
    return res.status(404).json({ message: "UOM needs to be correct format" });
  }
  for (const ops in req.body) {
    console.log("VALUE", ops);
    if (
      (ops === "uom" || ops === "sku_code") &&
      (req.body["uom"] !== req.params.uom ||
        req.body["sku_code"] !== req.params.sku)
    ) {
      return res.status(404).json({ message: "You Cannot Update SKU or UOM" });
    } else {
      updateOPS[ops] = req.body[ops];
    }
  }
  ReleaseSchema.updateOne(
    { sku_code: sku, uom: UOM },
    { $set: updateOPS },
    { upsert: true }
  )
    .exec()
    .then((result) => {
      console.log("RELEASE UPDATED", result);
      res.status(200).json({
        message: "Release Item updated",
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({
        error: err,
        message:
          err.keyValue && err.keyValue["sku_code"]
            ? `SKU CODE ${err.keyValue["sku_code"]} Already Exists`
            : "Something Went Wrong",
      });
    });
});

//Get a Unique Record using the UOM and SKU
router.get("/view/:uom/:sku", (req, res) => {
  const UOM = req.params.uom;
  const sku = req.params.sku;
  ReleaseSchema.find({ uom: UOM, sku_code: sku })
    .exec()
    .then((result) => {
      if (result) {
        console.log("Found An Item with UOM" + UOM + "and sku as" + sku);
        res.status(200).json({ result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Add A New Release Item
router.post("/add", (req, res) => {
  const newReleaseItem = new ReleaseSchema({
    _id: new mongoose.Types.ObjectId(),
    product_category: req.body.product_category,
    sku_code: req.body.sku_code,
    uom: req.body.uom,
    lead_time: req.body.lead_time,
    sourcing_location: req.body.sourcing_location,
    days_of_stock: req.body.days_of_stock,
    intransit_inventory_days: req.body.intransit_inventory_days,
    forecast_demand: req.body.forecast_demand,
    recommended_order: req.body.recommended_order,
    revised_order_qty: req.body.revised_order_qty,
  });
  newReleaseItem
    .save()
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "Created Sucessfully",
          info: {
            _id: result.id,
            product_category: result.product_category,
            sku_code: result.sku_code,
            uom: result.uom,
            lead_time: result.lead_time,
            sourcing_location: result.sourcing_location,
            days_of_stock: result.days_of_stock,
            intransit_inventory_days: result.intransit_inventory_days,
            forecast_demand: result.forecast_demand,
            recommended_order: result.recommended_order,
            revised_order_qty: result.revised_order_qty,
          },
        });
      } else {
        res.status(404).json({
          message: "No Valid Entry Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/remove/:id", (req, res) => {
  const id = req.params.id;
  ReleaseSchema.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Release Data Deleted",
        id: req.params.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Given ID Not Available In DB",
        error: err,
      });
    });
});

module.exports = router;
