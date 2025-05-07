import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { SignUpRequest } from 'src/app/models/signupRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  statusMessage: string = "";

  signupForm: SignUpRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  signUp() {
    if(this.verifyInputs()) {
      this.authService.signup(this.signupForm).subscribe({
        next: (response) => {
          this.statusMessage = response + " Redirecting to login.";
          setTimeout(() => this.router.navigateByUrl("login"), 2000);
        },
        error: (err) => {
          this.statusMessage = "Error Signing up";
          console.log(err);
        }
      })
    }
  }

  verifyInputs(): boolean {
    const password = this.signupForm.password;

    if (this.signupForm.email.length < 3 || this.signupForm.password.length < 3) {
      this.statusMessage = "Email or password too short";
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=[A-Z])(?=(?:.*\d){2,}).{4,}$/;

    if (!this.signupForm.email.match(emailRegex)) {
      this.statusMessage = "Email is not valid!";
      return false;
    } else if (!password.match(passwordRegex)) {
      this.statusMessage = "Password needs to start with 1 uppercase letter and include atleast 2 numbers";
      return false;
    }
    return true;
  }

}
