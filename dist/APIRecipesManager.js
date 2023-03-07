class APIManager {
  constructor() {
    this.data = [];
    this.ingredient = "";
    this.gluten = "";
    this.dairy = "";
    this.page = 0;
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
    return $.get(
      `http://localhost:3000/recipes/${this.ingredient}?gluten=${this.gluten}&dairy=${this.dairy}&page=${this.page}`
    ).then((result) => {
      render.RenderRecipesOfIngredent(result);
    });
  }
}
