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

module.exports = router;
