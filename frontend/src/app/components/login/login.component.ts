import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: LoginRequest = {
    email: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  login(loginRequest: LoginRequest) {
    this.authService.login(loginRequest).subscribe({
      next: (authToken) => {
        sessionStorage.setItem("token", authToken.token);
        sessionStorage.setItem("expiration", authToken.expiration);
        this.authService.checkLogin().subscribe(() => {
          this.router.navigate(['/']);
        });
        
      },
      error: (error) => {
        console.log("Login Error Occured: " + error);
      }
    })
  }

}
