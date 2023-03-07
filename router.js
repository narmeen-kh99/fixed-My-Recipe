const express = require("express");
const router = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const data = require("./data");

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
  let page = req.query.page;
  let startIndex = (page - 1) * 6;
  let endIndex = page * 6;
  ingredientR = req.params.ingredientName;
  arr = [];
  if (Dairy == "true") {
    arr.push(...data.dairyIngredients);
  }
  if (Gluten == "true") {
    arr.push(...data.glutenIngredients);
  }
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${req.params.ingredientName}`
    )
    .then((recipes) => {
      res.send(resipesFilter(recipes, arr).slice(startIndex, endIndex));
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
