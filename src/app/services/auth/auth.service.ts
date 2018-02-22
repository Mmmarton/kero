import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials } from '../../user/credentials.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private api = "http://localhost:8080/";
  private user: User;
  private expirationDate: Date = new Date(Date.now() + (1000 * 60 * 60 * 24 * 10));

  constructor(private cookies: CookieService, private http: HttpClient, private router: Router) {
    this.user = new User();
    let savedUser = <User>cookies.getObject('user');
    if (savedUser) {
      this.checkIfValidLogin(savedUser);
    }
    else {
      this.get("auth/session", "text").subscribe(r => { });
    }
  }

  post(url: string, object: any, type: any = 'json') {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN'));
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.post(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  get(url: string, type: any = 'json') {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.get(this.api + url, { headers: headers, withCredentials: true, responseType: type });
  }

  logIn(user: User) {
    this.user = user;
    if (this.user) {
      this.cookies.putObject("user", this.user, { expires: this.expirationDate });
    }
  }

  logOut() {
    this.cookies.remove("user");
    this.user = new User();
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    return this.user.token != null;
  }

  getUser() {
    return this.user.getCopy();
  }

  updateUser(user: User) {
    if (this.user.token) {
      this.user.update(user);
      if (this.cookies.get('user')) {
        this.cookies.putObject("user", this.user, { expires: this.expirationDate });
      }
    }
  }

  private checkIfValidLogin(savedUser: User) {
    this.user.update(savedUser);
    this.get("auth/status").subscribe(
      result => {
        if (!(<any>result).role || (<any>result).role != this.user.role) {
          this.logOut();
        }
      },
      error => {
        this.logOut();
      }
    );
  }
}
