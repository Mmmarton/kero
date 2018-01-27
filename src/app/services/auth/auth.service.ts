import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private router: Router) { }

  logIn(user: User) {
    user.firstName = "Jake";
    user.lastName = "Markov";
    user.nickname = "jama";
    this.user = user;
    this.router.navigate(['/dashboard']);
  }

  logOut() {
    this.user = null;
  }

  isLoggedIn() {
    return this.user != null;
  }
}
