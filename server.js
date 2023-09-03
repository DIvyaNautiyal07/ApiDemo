const express = require("express");
const app = express();
const PORT = 8080;

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

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url} `);
  next();
};

app.use(logger);

app.listen(PORT, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  res.send(product);
});

app.post("/products", (req, res) => {
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

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const dbProduct = products[parseInt(id) - 1];
  products[parseInt(id) - 1] = Object.assign(dbProduct, product);
  res.send({ success: true });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  products.splice(parseInt(id) - 1, 1);
  res.send({ success: true });
});
