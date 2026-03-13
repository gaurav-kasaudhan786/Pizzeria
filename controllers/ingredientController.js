const Ingredient = require("../models/Ingredient");

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};