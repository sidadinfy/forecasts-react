const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MaintainSchema = require("../models/maintainSchema");

//Test Route
router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Test",
  });
});

//Get All Maintain Data
router.get("/view", (req, res, next) => {
  MaintainSchema.find()
    .select()
    .exec()
    .then((result) => {
      const response = [...result];
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
});

//Updated Single Forecast ID
router.put("/save/:id", (req, res) => {
  const id = req.params.id;
  const updateOPS = {};
  for (const ops in req.body) {
    console.log("VALUE", ops);
    updateOPS[ops] = req.body[ops];
  }
  MaintainSchema.updateOne({ _id: id }, { $set: updateOPS }, { upsert: true })
    .exec()
    .then((result) => {
      console.log("FORECAST UPDATED", result);
      res.status(200).json({
        message: "Forecast updated",
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/view/:uom/:sku", (req, res) => {
  const UOM = req.params.uom;
  const sku = req.params.sku;
  MaintainSchema.find({ uom: UOM, sku_code: sku })
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

router.post("/add", (req, res) => {
  const newMaintainItem = new MaintainSchema({
    _id: new mongoose.Types.ObjectId(),
    product_category: req.body.product_category,
    sku_code: req.body.sku_code,
    uom: req.body.uom,
    period: req.body.period,
    stats_forecast: req.body.stats_forecast,
    rec_forecast: req.body.rec_forecast,
  });
  newMaintainItem
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
            period: result.period,
            stats_forecast: result.stats_forecast,
            rec_forecast: result.rec_forecast,
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
  MaintainSchema.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Maintain Data Deleted",
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
