import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {subscribeOn} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipes} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recieForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (parems: Params) => {
        this.id = +parems['id'];
        this.editMode = parems['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    )
  }


  onDeleteIngredienr(index: number) {
    (<FormArray>this.recieForm.get('ingrident')).removeAt(index)
  }

  onIngredient() {
    (<FormArray>this.recieForm.get('ingrident')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onSubmit() {
    const newRecipe = new Recipes(
      this.recieForm.value['name'],
      this.recieForm.value['description'],
      this.recieForm.value['imagePath'],
      this.recieForm.value['ingrident']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.onCancle()
  }

  onCancle() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let descrition = '';
    let recipeIngrediens = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      descrition = recipe.description;

      if (recipe['ingridients']) {
        for (let ingredient of recipe.ingridients) {
          recipeIngrediens.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );

        }
      }
    }
    this.recieForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(descrition, Validators.required),
      "ingrident": recipeIngrediens
    })
  }

  get recipeControls() {
    return (this.recieForm.get('ingrident') as FormArray).controls
  }

}
