import {Component, OnInit} from '@angular/core';
import {ShoopinfListService} from "./shoping-list/shoopinf-list.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
constructor(private authSrevice : AuthService) {
}
  ngOnInit() {
  this.authSrevice.autoLogin()

  }

}
