import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private cookies: CookieService) {
    let user = new User();
    let savedUser = <User>cookies.getObject('user');
    if (savedUser) {
      this.user = user.update(savedUser);
    }
  }

  logIn(username: string, password: string) {
    this.user = this.fetchUser(username, password);
    if (this.user) {
      this.cookies.putObject("user", this.user);
    }
    return this.user;
  }

  private fetchUser(username: string, password: string) {
    let user: User = new User(username, password);
    user.firstName = "Jake";
    user.lastName = "Markov";
    user.nickname = "jama";
    user.email = "asd@asd.asd";
    user.picture = "/assets/img/user.jpg";
    return user;
  }

  logOut() {
    this.cookies.remove("user");
    this.user = null;
  }

  isLoggedIn() {
    return this.user != null;
  }

  getUser() {
    if (this.user) {
      return this.user.getCopy();
    }
    return null;
  }

  updateUser(user: User) {
    if (this.user) {
      this.user.update(user);
      if (this.cookies.get('user')) {
        this.cookies.putObject("user", this.user);
      }
    }
    return null;
  }
}
