import { Component } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent {
  ingredients:Ingredient[] = [
    new Ingredient('Apple' , 4),
    new Ingredient('Orange' , 10)
  ];


  onIngridentAdded(ingridents : Ingredient){
    this.ingredients.push(ingridents)

  }


}
