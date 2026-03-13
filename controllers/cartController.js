const Cart = require("../models/Cart");
const Pizza = require("../models/Pizza");
const Ingredient = require("../models/Ingredient");
const calculatePrice = require("../utils/priceCalculator");

exports.addPizzaToCart = async (req, res) => {
  const { pizzaId, quantity } = req.body;

  try {
    const pizza = await Pizza.findById(pizzaId);

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const totalPrice = pizza.price * quantity;

    cart.items.push({
      pizzaId,
      quantity,
      extraIngredients: [],
      totalPrice
    });

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addIngredient = async (req, res) => {
  const { cartItemId, ingredientId } = req.body;

  try {

    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(cartItemId);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const ingredient = await Ingredient.findById(ingredientId);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    const existingIngredientIndex = item.extraIngredients.findIndex(
      (ext) => ext.ingredientId.toString() === ingredientId.toString()
    );

    if (existingIngredientIndex > -1) {
      // Ingredient already added, so remove it
      item.extraIngredients.splice(existingIngredientIndex, 1);
    } else {
      // Ingredient not added, so add it
      item.extraIngredients.push({
        ingredientId,
        price: ingredient.price
      });
    }

    const pizza = await Pizza.findById(item.pizzaId);

    const basePizzaPriceTotal = pizza.price * item.quantity;
    const ingredientsPriceTotal = calculatePrice(0, item.extraIngredients); // Use helper just for ingredients

    item.totalPrice = basePizzaPriceTotal + ingredientsPriceTotal;

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find()
      .populate("items.pizzaId")
      .populate("items.extraIngredients.ingredientId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removePizzaFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      
      const updatedCart = await Cart.find()
        .populate("items.pizzaId")
        .populate("items.extraIngredients.ingredientId");
        
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};