import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoopinfListService} from "./shoopinf-list.service";
import {Subscription} from "rxjs";
import transformJavaScript
  from "@angular-devkit/build-angular/src/builders/browser-esbuild/javascript-transformer-worker";

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private idChangeSubscribe!: Subscription;

  constructor(private shopingListService: ShoopinfListService) {
  }

  ngOnInit() {
    this.ingredients = this.shopingListService.getIngerdient();
    this.idChangeSubscribe = this.shopingListService.ingridiyantChanged.subscribe(
      (ingridiyants: Ingredient[]) => {
        this.ingredients = ingridiyants;
      }
    )
  }

  onEditItem(index: number) {
    this.shopingListService.startingEditing.next(index)
  }

  ngOnDestroy(): void {
    this.idChangeSubscribe.unsubscribe();
  }
}
