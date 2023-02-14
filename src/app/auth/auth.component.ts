import {Component, ComponentFactoryResolver, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertCompnent} from "../shared/alert/alert.compnent";
import {PlaceholderDirecive} from "../shared/placeHolder/placeholder.direcive";
// import {AuthGuard} from "./auth.guard";
// import * as cluster from "cluster";

@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html"
})


export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null

  private closeSubscription : Subscription

  @ViewChild(PlaceholderDirecive)  alertHost : PlaceholderDirecive;

  constructor(private authrenticationService: AuthService,
              private router: Router,
              private componentFectoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authobservable: Observable<AuthResponse>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authobservable = this.authrenticationService.login(email, password)

    } else {
      authobservable = this.authrenticationService.signUp(email, password)
    }
    authobservable.subscribe(responceData => {
        console.log(responceData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage)
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        this.isLoading = false;
      });

    form.reset()
  }


  private showErrorAlert(message: string) {
    const alertComponentFactor = this.componentFectoryResolver.resolveComponentFactory(AlertCompnent);

    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear();

   const componentRef = hostViewContainerRef.createComponent(alertComponentFactor)

    componentRef.instance.message= message;
   this.closeSubscription=  componentRef.instance.close.subscribe(()=>{
      this.closeSubscription.unsubscribe()
     hostViewContainerRef.clear();
   })

  }

}
