const apiManager = new APIManager();
const render = new Renderer();
$("#Search").on("click", () => {
  apiManager.page = 1;
  apiManager.getReipes();
});
$("#next").on("click", () => {
  apiManager.page++;
  apiManager.getReipes();
});
$("#back").on("click", () => {
  apiManager.page--;
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
