import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipes} from "../../recipe.model";

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent implements OnInit {
  @Input() recipe!: Recipes;
  @Input() index!: number;

  ngOnInit() {

  }
}
