const express = require("express");
const router = express();
const axios = require("axios");
const bodyParser = require("body-parser");

dairyIngredients = [
  "Cream",
  "Cheese",
  "Milk",
  "Butter",
  "Creme",
  "Ricotta",
  "Mozzarella",
  "Custard",
  "Cream Cheese",
];
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"];
let dairyGlutenIngredients = [].concat(glutenIngredients, dairyIngredients);
checkCommonsItems = function (arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (
        arr1[i] == arr2[j] ||
        arr1[i] == arr2[j].toLowerCase() ||
        arr1[i].search(arr2[j]) != -1 ||
        arr1[i].search(arr2[j].toLowerCase()) != -1
      ) {
        return true;
      }
    }
  }
  return false;
};


router.get("/recipes/:ingredientName", (req, res) => {
  let Gluten = req.query.gluten;
  let Dairy = req.query.dairy;
  let next = req.query.next;
  ingredientR = req.params.ingredientName;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${req.params.ingredientName}`
    )
    .then((recipes) => {
      let result = "";
      let Recipes = initDataRecipes(recipes);
      let RecipesWithoutGluten = [];
      let RecipesWithoutDairy = [];
      let bothGletenDairyR = [];
      if (Gluten == "true" && Dairy == "false") {
        res.send(
          (resipesFilter(recipes, glutenIngredients))
        );
      } else if (Gluten == "false" && Dairy == "true") {
        res.send(
          (resipesFilter(recipes, dairyIngredients))
        );
      } else if (Gluten == "true" && Dairy == "true") {
        res.send(
          (resipesFilter(recipes, dairyGlutenIngredients))
        );
      } else {
        res.send(Recipes);
      }
    });
});

resipesFilter = function (recipes, ingredientArr) {
  let newArrRecipes = [];
  for (recipe of recipes.data.results) {
    if (!checkCommonsItems(recipe.ingredients, ingredientArr)) {
      newArrRecipes.push(recipe);
    }
  }
  return [...newArrRecipes];
};

initDataRecipes = function (recipe) {
  let filterDataRecipes = [];
  let newRecipe = {};
  for (let i = 0; i < recipe.data.results.length; i++) {
    newRecipe = {};
    newRecipe["idMeal"] = recipe.data.results[i].idMeal;
    newRecipe["ingredients"] = recipe.data.results[i].ingredients;
    newRecipe["title"] = recipe.data.results[i].title;
    newRecipe["thumbnail"] = recipe.data.results[i].thumbnail;
    newRecipe["href"] = recipe.data.results[i].href;
    filterDataRecipes.push(newRecipe);
  }
  return filterDataRecipes;
};
module.exports = router;
