import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";


export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable(
  {providedIn: "root"}
)
export class AuthService {

  user = new BehaviorSubject<User>(null)
  private tokenExpirationDuration: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  logOut() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.clear()
    if (this.tokenExpirationDuration) {
      clearTimeout(this.tokenExpirationDuration)
    }
    this.tokenExpirationDuration = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
    this.tokenExpirationDuration = setTimeout(() => {
      this.logOut()
    }, expirationDuration)
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_vZFPOUZmP5co_p4FLvQ-HwJw7pC-7Y0",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.HandelError),
        tap(responseData => {
            this.handleAuthrenication(responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn)
          }
        )
      );

  }


  login(email: string, password: string) {
    return this.http.post<AuthResponse>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_vZFPOUZmP5co_p4FLvQ-HwJw7pC-7Y0', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.HandelError),
        tap(responseData => {
          this.handleAuthrenication(responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn)
        }
      ));

  }

  private HandelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'unknown Error';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = "User Not Found"
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email is exists already';
    }
    return throwError(errorMessage);
  }

  private handleAuthrenication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number) {
    const experationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, experationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }


  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return;
    }
    const lodedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (lodedUser.token) {

      this.user.next(lodedUser);
      const expreationDuration = new  Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expreationDuration)
    }
  }

}
