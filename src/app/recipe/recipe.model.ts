import {Ingredient} from "../shared/ingredient.model";

export class Recipes {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingridients: Ingredient[];

  constructor(name: string, desc: string, imagepath: string, ingridient: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagepath;
    this.ingridients = ingridient
  }
}

