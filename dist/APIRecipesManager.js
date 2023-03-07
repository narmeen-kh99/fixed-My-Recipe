class APIManager {
  constructor() {
    this.data = [];
    this.next = "";
    this.ingredient = "";
    this.gluten = "";
    this.dairy = "";
    this.index = 0;
  }
  nextVal() {
    this.next = $("#next").on("clik", () => {
      return true;
    });
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
    this.nextVal();
    return $.get(
      `http://localhost:3000/recipes/${this.ingredient}?gluten=${this.gluten}&dairy=${this.dairy}&next=${this.next}`
    ).then((result) => {
      console.log(result);
      render.RenderRecipesOfIngredent(result);
    });
  }
}
