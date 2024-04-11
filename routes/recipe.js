const express = require("express");
const recipeControllers = require("../controllers/recipeControllers");
const router = express.Router();

router.post("/create-recipe", recipeControllers.createingRecipe);
router.get("/get-recipe", recipeControllers.getRecipe);

module.exports = router;
