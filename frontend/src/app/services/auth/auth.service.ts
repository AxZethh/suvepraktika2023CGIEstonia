import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoginRequest } from 'src/app/models/loginRequest';
import { SignUpRequest } from 'src/app/models/signupRequest';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User | null>(null);
  admin = new BehaviorSubject<boolean>(false);
  loggedIn = new BehaviorSubject<boolean>(false);
  
  baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  checkLogin(): Observable<any> {
    const url = this.baseUrl + "/user";
    return this.http.get<User>(url).pipe(
      tap((user) => {
        this.userSubject.next(user); 
        this.loggedIn.next(true);
        if(user.userRole === "LIBRARIAN" || user.userRole === "ADMIN") {
          this.admin.next(true);
        } else{ 
          this.admin.next(false);
        }
        
      })
    )
  }

  login(loginRequest: LoginRequest): Observable<any> {
    const loginUrl = this.baseUrl + "/auth/login";
    return this.http.post<any>(loginUrl, loginRequest);
  }

  signup(signupRequest: SignUpRequest): Observable<any> {
    const signUpUrl = this.baseUrl + "/auth/signup";
    return this.http.post<any>(signUpUrl, signupRequest, { responseType: 'text' as 'json' })
  }

  logOut() {
    sessionStorage.clear();
    this.userSubject.next(null);
    this.loggedIn.next(false);
    this.admin.next(false);
  }
}
