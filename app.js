require("dotenv").config(); // Configure dotenv to load in the .env file

const express = require("express");
const bodyParser = require("body-parser");
const maintainRoutes = require("./api/routes/Maintain");
const morgan = require("morgan");
const app = express();
//
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  });

app.use(morgan("dev"));
//app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
  if (req.method === "OPTIONS ") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Api is Working" });
});

app.use("/maintain", maintainRoutes);

/* 
app.use("/products", productRoutes);
app.use("/orders", orderRoutes); */
//app.use("/user", userRoutes);
//app.use("/posts", postRoutes);

//! If the Routes comes past the above middleware
//! Then there is an Error, So all Error must be handled after the accepted routes

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message },
  });
});
module.exports = app;
