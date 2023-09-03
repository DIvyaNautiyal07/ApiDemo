require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const productRouter = require("./routes/products");

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url} `);
  next();
};

app.use(logger);

app.use(productRouter);

app.listen(PORT, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
