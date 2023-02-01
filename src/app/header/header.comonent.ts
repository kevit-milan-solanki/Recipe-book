import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
  }
)
export class HeaderComonent{
 @Output() featureSelected = new EventEmitter<string>()

collapsed = true
  constructor(private datStorageService : DataStorageService) {
  }

  onSelect(feature : string ){
    this.featureSelected.emit(feature)
  }

  onSaveData(){
    this.datStorageService.storeRecipe()
  }
  onFatchData(){
    this.datStorageService.fatchData().subscribe()
  }

}
