import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthGuard} from "./auth.guard";

@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html"
})


export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null

  constructor(private authrenticationService: AuthService ,
              private  router : Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    let authobservable : Observable<AuthResponse>;
    this.isLoading = true;
    if (this.isLoginMode) {
     authobservable = this.authrenticationService.login(email, password)

    } else {
     authobservable  = this.authrenticationService.signUp(email, password)
    }

    authobservable.subscribe(responceData => {
        console.log(responceData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false;
      });

    form.reset()
  }

  onCloseError(){
    this.error = null;
  }

}
