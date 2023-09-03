const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Product = require("../models/products");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.send;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

router.use(verifyJWT);

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.status(400).send({ error: "Resource Not Found" });
  }
});

router.post("/", async (req, res) => {
  const user = req.user;
  if (user && user.role === "ADMIN") {
    const product = req.body;
    const dbProduct = await Product.create(product);
    res.send(dbProduct);
  } else {
    res.status(403).send({ error: "Not authorized" });
  }
});

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const product = req.body;
//   const dbProduct = products[parseInt(id) - 1];
//   products[parseInt(id) - 1] = Object.assign(dbProduct, product);
//   res.send({ success: true });
// });

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   index = products.findIndex((product) => product.id === parseInt(id));
//   console.log(index);
//   if (index < products.length && index >= 0) {
//     products.splice(index, 1);
//     res.send({ success: true });
//   } else {
//     res.send({ success: false });
//   }
// });

module.exports = router;
