import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private cookies: CookieService) {
    this.user = <User>cookies.getObject('user');
  }

  logIn(username: string, password: string, stayIn: boolean) {
    this.user = this.fetchUser(username, password);
    if (stayIn && this.user) {
      this.cookies.putObject("user", this.user);
    }
    return this.user;
  }

  private fetchUser(username: string, password: string) {
    let user: User = new User(username, password);
    user.firstName = "Jake";
    user.lastName = "Markov";
    user.nickname = "jama";
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
    return this.user;
  }
}
