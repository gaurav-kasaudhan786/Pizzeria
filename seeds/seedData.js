const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");

const Pizza = require("../models/Pizza");
const Ingredient = require("../models/Ingredient");

connectDB();

const pizzas = [
  {
    name: "Paneer Tikka",
    description: "Paneer with spicy tikka sauce and fresh vegetables",
    type: "Veg",
    price: 290,
    ingredients: ["Paneer", "Capsicum", "Onion"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Farmhouse",
    description: "Loaded with mushrooms, capsicum and tomato",
    type: "Veg",
    price: 260,
    ingredients: ["Mushroom", "Tomato", "Capsicum"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Margherita",
    description: "Classic cheese pizza with tomato sauce",
    type: "Veg",
    price: 200,
    ingredients: ["Cheese", "Tomato Sauce"],
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Veg Extravaganza",
    description: "Loaded with golden corn, olives and veggies",
    type: "Veg",
    price: 320,
    ingredients: ["Corn", "Olives", "Capsicum"],
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mexican Green Wave",
    description: "Mexican herbs with crunchy vegetables",
    type: "Veg",
    price: 310,
    ingredients: ["Jalapeno", "Capsicum", "Onion"],
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chicken Dominator",
    description: "Loaded with chicken toppings",
    type: "Non-Veg",
    price: 380,
    ingredients: ["Chicken", "Cheese"],
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chicken Golden Delight",
    description: "Chicken with golden corn",
    type: "Non-Veg",
    price: 360,
    ingredients: ["Chicken", "Corn"],
    image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Pepperoni Pizza",
    description: "Classic pepperoni pizza",
    type: "Non-Veg",
    price: 400,
    ingredients: ["Pepperoni", "Cheese"],
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chicken Fiesta",
    description: "Grilled chicken with onion and capsicum",
    type: "Non-Veg",
    price: 370,
    ingredients: ["Chicken", "Onion", "Capsicum"],
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "BBQ Chicken Pizza",
    description: "Chicken with smoky BBQ sauce",
    type: "Non-Veg",
    price: 390,
    ingredients: ["Chicken", "BBQ Sauce"],
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const ingredients = [
  { name: "Pepperoni", price: 110 },
  { name: "Mushroom", price: 35 },
  { name: "Olives", price: 40 },
  { name: "Capsicum", price: 20 },
  { name: "Chicken", price: 60 },
  { name: "Paneer", price: 55 },
  { name: "Corn", price: 30 },
  { name: "Tomato", price: 15 },
  { name: "Onion", price: 15 },
  { name: "Jalapeno", price: 25 },
  { name: "Cheese", price: 50 },
  { name: "BBQ Sauce", price: 20 },
  { name: "Black Beans", price: 45 },
  { name: "Spinach", price: 30 },
  { name: "Extra Cheese", price: 60 }
];

const seedDatabase = async () => {
  try {
    await Pizza.deleteMany();
    await Ingredient.deleteMany();

    await Pizza.insertMany(pizzas);
    await Ingredient.insertMany(ingredients);

    console.log("Seed Data Inserted Successfully 🌱");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();