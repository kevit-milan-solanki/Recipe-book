import {Component} from '@angular/core';
import {ShoopinfListService} from "./shoping-list/shoopinf-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoopinfListService]
})
export class AppComponent {
  lodadeFeature = 'recipe';

  onNaviget(feature: string) {
    this.lodadeFeature = feature;
  }
}
