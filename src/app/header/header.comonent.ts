import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
  }
)
export class HeaderComonent implements  OnInit , OnDestroy{
isAuthrenticated = false;
collapsed = true
  constructor(private datStorageService : DataStorageService,
             private authService: AuthService ) {
  }

  private  userSubscribe : Subscription;
  ngOnInit() {
   this.userSubscribe=  this.authService.user.subscribe(user=>{
    this.isAuthrenticated   = !user ? false : true;
     console.log()
   })
  }


  onLogout(){
    this.authService.logOut();
  }


  onSaveData(){
    this.datStorageService.storeRecipe()
  }
  onFatchData(){
    this.datStorageService.fatchData().subscribe()
  }

  ngOnDestroy() {
    this.userSubscribe.unsubscribe()
  }

}
