import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComonent} from "./header/header.comonent";
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeItemsComponent} from './recipe/recipe-list/recipe-items/recipe-items.component';
import {ShopingListComponent} from './shoping-list/shoping-list.component';
import {ShopingEditComponent} from './shoping-list/shoping-edit/shoping-edit.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeStartComponent} from './recipe/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LodingSpinnerComponent} from "./shared/loding-spiner/loding-spinner.component";
import {AuthIntersepterService} from "./auth/auth.intersepter.service";
import {AlertCompnent} from "./shared/alert/alert.compnent";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComonent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemsComponent,
    ShopingListComponent,
    ShopingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LodingSpinnerComponent,
    AlertCompnent

  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntersepterService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
