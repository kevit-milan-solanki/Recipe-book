import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipe/recipe.service";
import {Recipes} from "../recipe/recipe.model";
import { map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipe() {
    const UID = this.authService.user.value.id
    const recipes = this.recipeService.grtRecipe();
    this.httpClient.put('https://recipebook-app-6729b-default-rtdb.firebaseio.com/'+UID+'/recipe.json', recipes)
      .subscribe(response => {
      })
  }

  fatchData() {
    const UID = this.authService.user.value.id
    return this.httpClient.get<Recipes[]>
    ('https://recipebook-app-6729b-default-rtdb.firebaseio.com/'+UID+'/recipe.json',
    ).pipe(
      map(recipes => {
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
