import {Component, EventEmitter, Output} from '@angular/core';
import {Recipes} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() recipeWaselected = new EventEmitter<Recipes>()
  recipes: Recipes[] =[
    new Recipes('A test Recipe', 'Test Description' , 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'),
    new Recipes('A test Recipe', 'Test Description' , 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg')

  ];

  constructor() {
  }

  onRecipeSelected(recipe : Recipes){

  this.recipeWaselected.emit(recipe)
  }
}
