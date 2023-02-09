import {Recipes} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Injectable} from "@angular/core";
import {ShoopinfListService} from "../shoping-list/shoopinf-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipes[]>()
  recipes: Recipes[] = [
    // new Recipes('A test Recipe',
    //   'Test Description', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
    //   [
    //     new Ingredient("Meat", 1),
    //     new Ingredient("bread", 3)
    //   ]),
    // new Recipes('A test Recipe',
    //   'Test Description',
    //   'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    //   [
    //     new Ingredient("Egg", 3),
    //     new Ingredient('Poteo', 5)
    //   ])
  ];

  constructor(private slService: ShoopinfListService) {
  }

  setRecipe(recipe : Recipes[]){
      this.recipes =  recipe
      this.recipeChanged.next(this.recipes.slice())
  }

  grtRecipe() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngridentsToShoopinglist(ingridents: Ingredient[]) {
    this.slService.addIngridents(ingridents)
    //console.log(ingridents)
  }

  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
