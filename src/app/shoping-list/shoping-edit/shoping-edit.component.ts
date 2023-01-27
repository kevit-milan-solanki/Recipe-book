import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoopinfListService} from "../shoopinf-list.service";
import {NgForm} from "@angular/forms";
import {from, Subscription} from "rxjs";

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shopingListForm') shopingListForm: NgForm;

  constructor(private slService: ShoopinfListService) {
  }

  subscription!: Subscription;
  editMode = false
  editedItemIndex!: number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription = this.slService.startingEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngerdients(index);
        this.shopingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })

      })
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngrident = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editedItemIndex, newIngrident)
    } else {
      this.slService.onIngridentAdded(newIngrident);
    }
    this.shopingListForm.reset()
    this.editMode = false
  }

  clearIngredients() {
    this.editMode = false
    this.shopingListForm.reset()
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.shopingListForm.reset()
    this.editMode = false

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()

  }
}
