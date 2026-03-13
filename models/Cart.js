const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza"
  },

  quantity: {
    type: Number,
    default: 1
  },

  extraIngredients: [
    {
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
      },

      price: Number
    }
  ],

  totalPrice: Number
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema]
});

module.exports = mongoose.model("Cart", cartSchema);