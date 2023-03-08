class APIManager {
  constructor() {
    this.data = [];
    this.ingredient = "";
    this.gluten = "";
    this.dairy = "";
    this.page = 0;
    this.ingredientN = "";
  }
  ingredientNVal() {
    this.ingredientN = $("#ingredientN-input").val();
  }
  ingredientVal() {
    this.ingredient = $("#ingredient-input").val();
  }
  chexBoxVal() {
    this.gluten = $("#glutenB").is(":checked");
    this.dairy = $("#dairyB").is(":checked");
  }

  getReipes() {
    this.chexBoxVal();
    this.ingredientVal();
    this.ingredientNVal();
    return $.get(
      `http://localhost:3000/recipes/${this.ingredient}?gluten=${this.gluten}&dairy=${this.dairy}&page=${this.page}&ingredientN=${this.ingredientN}`
    ).then((result) => {
      render.RenderRecipesOfIngredent(result);
    });
  }
}
