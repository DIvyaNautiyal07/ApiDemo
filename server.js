require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const productRouter = require("./routes/products");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongodb connected");
});
app.use(express.json());

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url} `);
  next();
};

app.use(logger);

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
