import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoopinfListService {
  ingridiyantChanged = new Subject<Ingredient[]>()

  startingEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 4),
    new Ingredient('Orange', 10)
  ];

  getIngerdient() {
    return this.ingredients.slice();
  }

  getIngerdients(index: number) {
    return this.ingredients[index]
  }

  onIngridentAdded(ingridents: Ingredient) {
    this.ingredients.push(ingridents);
    this.ingridiyantChanged.next(this.ingredients.slice())
  }

  addIngridents(ingridents: Ingredient[]) {
    this.ingredients.push(...ingridents);
    this.ingridiyantChanged.next(this.ingredients.slice())
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingridiyantChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingridiyantChanged.next(this.ingredients.slice())
  }

}
