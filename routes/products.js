const express = require("express");
const router = express.Router();

const products = [
  {
    name: "Apple",
    price: 100,
    category: "Fruits",
    id: 1,
  },
  {
    name: "Banana",
    price: 50,
    category: "Fruits",
    id: 2,
  },
  {
    name: "Tomato",
    price: 120,
    category: "Vegetables",
    id: 3,
  },
];

router.get("/products", (req, res) => {
  res.send(products);
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  res.send(product);
});

router.post("/products", (req, res) => {
  const id = products.length + 1;
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    id: id,
  };

  products.push(product);
  res.send({ success: true });
});

router.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const dbProduct = products[parseInt(id) - 1];
  products[parseInt(id) - 1] = Object.assign(dbProduct, product);
  res.send({ success: true });
});

router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  index = products.findIndex((product) => product.id === parseInt(id));
  console.log(index);
  if (index < products.length && index >= 0) {
    products.splice(index, 1);
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;
