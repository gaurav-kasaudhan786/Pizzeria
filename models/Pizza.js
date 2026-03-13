const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  ingredients: [
    {
      type: String
    }
  ],

  image: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Pizza", pizzaSchema);