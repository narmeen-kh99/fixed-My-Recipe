const apiManager = new APIManager();
const render = new Renderer();
$("#Search").on("click", () => {
  apiManager.getReipes();
});
$("#next").on("clik", () => {
  apiManager.getReipes();
});
$(document).on("click", "img", function () {
  let firstIngredient = $(this)
    .closest(".Recipes")
    .find("ul li")
    .first()
    .text();
  alert("The first ingredient in the recipe is: " + firstIngredient);
});
