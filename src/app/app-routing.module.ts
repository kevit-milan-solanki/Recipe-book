import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe/recipe.component";
import {ShopingListComponent} from "./shoping-list/shoping-list.component";
import {RecipeStartComponent} from "./recipe/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipe/recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const appRouts: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipeComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]
  },
  {path: 'shopinglist', component: ShopingListComponent},
  {path: 'auth' , component: AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
