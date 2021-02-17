require("dotenv").config(); // Configure dotenv to load in the .env file
const childProcess = require("child_process");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const maintainRoutes = require("./api/routes/Maintain");
const releaseRoutes = require("./api/routes/Release");
const skuRoutes = require("./api/routes/SKU");
const morgan = require("morgan");
const path = require("path");
const app = express();
//
const mongoose = require("mongoose");

mongoose
  .connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URL : process.env.MONGO_URL_PROD , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected");
  });
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
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

app.use("/maintain", maintainRoutes);
app.use("/release", releaseRoutes);
app.use("/sku", skuRoutes);
app.get("/process", (req, res) => {
  let processData = [];
  // spawn new child process to call python script
  const python = childProcess.spawn("python", ["script.py"]);
  //collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe Data from python script");
    processData.push(data.toString());
  });

  //Close event to get all the data streamed from child process
  python.on("close", (code) => {
    console.log("Child Proccess closed with code", code);
    if (processData.length > 0) {
      //let dataset = JprocessData);
      res.status(200).json({ data: processData[0].replace(/\r\n/g, "") });
    } else {
      res.status(200).json({ data: [], message: "No Data" });
    }
  });

  python.on("error", (error) => {
    console.log("There Was An Error", JSON.stringify(error));
    res.status(500).json({ error: error });
  });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.status(200).json({ message: "Api is Working" });
  });
}

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
