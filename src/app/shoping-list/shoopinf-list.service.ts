import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn:'root'
})
export class ShoopinfListService {
  ingridiyantChanged = new Subject<Ingredient[]>()

  startingEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 4),
    new Ingredient('Tomatoes', 10),
  ];
  getIngerdient() {
    return this.ingredients.slice();
  }

  getIngerdients(index: number) {
    return this.ingredients[index]
  }

  onIngridentAdded(ingrident: Ingredient) {

    this.ingredients.push(ingrident);
    this.ingridiyantChanged.next(this.ingredients);
  }

  addIngridents(ingridents: Ingredient[]) {
    this.ingredients.push(...ingridents);
    this.ingridiyantChanged.next(this.ingredients);

  }
  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingridiyantChanged.next(this.ingredients)
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingridiyantChanged.next(this.ingredients)
  }

  // public  a = "XYZ"

}
