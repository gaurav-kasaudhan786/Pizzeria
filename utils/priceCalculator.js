const calculatePrice = (pizzaPrice, ingredients) => {
  let ingredientTotal = 0;

  ingredients.forEach((item) => {
    ingredientTotal += item.price;
  });

  return pizzaPrice + ingredientTotal;
};

module.exports = calculatePrice;