import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:'[appPlaceholder]'
})
export  class  PlaceholderDirecive{
  constructor(public viewContainerRef : ViewContainerRef) {
  }
}
