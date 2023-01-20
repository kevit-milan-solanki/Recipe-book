import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipes} from "../../recipe.model";

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent{
  // @ts-ignore
  @Input() recipe: Recipes;

  // @ts-ignore
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected(){
    this.recipeSelected.emit();
  }
}
