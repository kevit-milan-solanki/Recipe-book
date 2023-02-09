import {Component, EventEmitter, Input, Output} from "@angular/core";


@Component({
  selector: 'app-alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertCompnent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(){

    this.close.emit()
  }
}
