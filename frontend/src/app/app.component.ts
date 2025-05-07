import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  loggedIn: boolean = false;
  admin: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin().subscribe(() => {
      this.authService.loggedIn.subscribe((loggedIn) => {
        this.loggedIn = loggedIn;
        this.authService.admin.subscribe((admin) => this.admin = admin);
      })
    });
  }

  logOut() {
    this.authService.logOut();
  }
  
}
