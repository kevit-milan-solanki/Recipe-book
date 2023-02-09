import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipes} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipes[]>{
  constructor(private dataStorageService : DataStorageService,
              private recipeService : RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const recipe = this.recipeService.grtRecipe()
    if(recipe.length === 0 ) {

      return this.dataStorageService.fatchData()
    }
    else{
      return recipe;
    }
  }

}
