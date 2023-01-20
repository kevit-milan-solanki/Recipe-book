import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent {
  // @ts-ignore
  @ViewChild('nameInput') nameInputeReance: ElementRef;
  // @ts-ignore
  @ViewChild('amountInput') amountInputRefrance: ElementRef;

  @Output() addeIngrident = new EventEmitter<Ingredient>()

  onAddItem(){
    const ingridentName = this.nameInputeReance.nativeElement.value;
    const ingridentAmount = this.amountInputRefrance.nativeElement.value;
    const newIngrident = new Ingredient(ingridentName , ingridentAmount)
    this.addeIngrident.emit(newIngrident);
  }

}
