import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials } from '../../user/credentials.model';

@Injectable()
export class AuthService {

  private api = "http://localhost:8080/";
  private user: User;

  constructor(private cookies: CookieService, private http: HttpClient) {
    let user = new User();
    let savedUser = <User>cookies.getObject('user');
    if (savedUser) {
      this.user = user.update(savedUser);
    }
    this.get("auth/session", "text");
  }

  post(url: string, object: any, type: any = 'json') {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN'));
    return this.http.post(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  get(url: string, type: any = 'json') {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.api + url, { headers: headers, withCredentials: true, responseType: type });
  }

  logIn(user: User) {
    this.user = user;
    if (this.user) {
      this.cookies.putObject("user", this.user);
    }
  }

  private fetchUser(username: string, password: string) {
    let user: User = new User();
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
