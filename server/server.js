const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
require("dotenv").config();

const MONGO_URL = process.env.Mongo_URL;

app.use(cors());

//middleware
app.use(express.json());

//routes (to access in the web browser)
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

//connect to database and start server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("🔌 Connected to Database.");
    app.listen(3001, () => {
      console.log("🚀 Server is Running.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
