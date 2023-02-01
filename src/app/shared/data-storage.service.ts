import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipe/recipe.service";
import {Recipes} from "../recipe/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }


  storeRecipe() {
    const recipes = this.recipeService.grtRecipe();
    this.httpClient.put('https://recipe-book-app-de416-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      })
  }


  fatchData() {
    return this.httpClient.get<Recipes[]>
    ('https://recipe-book-app-de416-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingridients: recipe.ingridients ? recipe.ingridients : []
          }
        })
      }), tap(recipe => {
        this.recipeService.setRecipe(recipe)
      }))

  }

}
