import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipes} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @Output() recipeWaselected = new EventEmitter<Recipes>()
  recipes!: Recipes[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorage :DataStorageService) {
  }

  ngOnInit() {
    // this.dataStorage.storeRecipe()
    this.dataStorage.fatchData().subscribe()
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipe: Recipes[]) => {
        this.recipes = recipe;
      }
    )
    this.recipes = this.recipeService.grtRecipe()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe()
  }

}
