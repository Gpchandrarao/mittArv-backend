const Recipe = require("../models/Recipe");

const createingRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, image } = req.body;
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      image,
    });
    await newRecipe.save();
    res.status(200).json({ message: "recipe crested", recipe: newRecipe });
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });

    console.log(`error from createing recipe ${error}`);
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    console.log("Error retrieving recipe", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createingRecipe, getRecipe };
