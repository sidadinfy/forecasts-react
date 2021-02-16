const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const SkuSchema = require("../models/skuSchema");

//Test Route
router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Test",
  });
});

//Get All Maintain Data
router.get("/view", (req, res, next) => {
  SkuSchema.find()
    .select()
    .exec()
    .then((result) => {
      const response = [...result];
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
});

//Get a Unique Record using SKU
router.get("/view/:sku", (req, res) => {
  const sku = req.params.sku;
  SkuSchema.find({ value: sku })
    .exec()
    .then((result) => {
      if (result) {
        console.log("Found An Item with sku as" + sku);
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
  const newSKU = new SkuSchema({
    _id: new mongoose.Types.ObjectId(),
    value: req.body.value,
    name: req.body.name,
  });
  if (req.body.value.toLowerCase() === req.body.name.toLowerCase()) {
  } else {
    return res.status(500).json({ message: "Name and Value Need to be equal" });
  }
  newSKU
    .save()
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "SKU Created Sucessfully",
          info: {
            _id: result.id,
            name: result.name,
            value: result.value,
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
  SkuSchema.deleteOne({ _id: id })
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
