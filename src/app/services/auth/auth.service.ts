import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private router: Router) {
    this.logIn(new User("jaja", "123"));
  }

  logIn(user: User) {
    user.firstName = "Jake";
    user.lastName = "Markov";
    user.nickname = "jama";
    user.picture = "/assets/img/user.jpg"
    this.user = user;
    this.router.navigate(['/dashboard']);
  }

  logOut() {
    this.user = null;
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    return this.user != null;
  }

  getUser() {
    return this.user;
  }
}
