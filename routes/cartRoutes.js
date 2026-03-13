const express = require("express");

const router = express.Router();

const {
  addPizzaToCart,
  addIngredient,
  getCart,
  removePizzaFromCart
} = require("../controllers/cartController");

router.post("/add", addPizzaToCart);

router.post("/add-ingredient", addIngredient);

router.get("/", getCart);

router.delete("/remove/:cartItemId", removePizzaFromCart);

module.exports = router;