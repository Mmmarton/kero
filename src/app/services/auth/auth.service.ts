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
      this.getPictureOrLogOut(savedUser);
    }
    else {
      this.get("auth/session", "text").subscribe(r => { });
    }
  }

  getPicture(email?: string) {
    if (email == null) {
      email = this.user.email;
    }
    return this.get("user/picture/" + email, 'text');
  }

  setPicture(picture: string) {
    this.user.picture = picture;
  }

  post(url: string, object: any, type: any = 'json') {
    let headers = new HttpHeaders()
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN'));
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.post(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  put(url: string, object: any, type: any = 'json') {
    let headers = new HttpHeaders()
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN'));
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.put(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  get(url: string, type: any = 'json') {
    let headers = new HttpHeaders();
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.get(this.api + url, { headers: headers, withCredentials: true, responseType: type });
  }

  logIn(user: User) {
    this.user = user;
    if (this.user) {
      let user = this.user;
      user.picture = "";
      this.cookies.putObject("user", user, { expires: this.expirationDate });
      this.getPicture().subscribe(
        result => {
          this.user.picture = result;
        }
      );
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
        let user = this.user;
        user.picture = "";
        this.cookies.putObject("user", user, { expires: this.expirationDate });
      }
    }
  }

  isAdmin() {
    return this.user.role == "ROLE_ADMIN";
  }

  isMember() {
    return this.user.role == "ROLE_MEMBER" || this.user.role == "ROLE_ADMIN";
  }

  private getPictureOrLogOut(savedUser: User) {
    this.user.update(savedUser);
    this.getPicture().subscribe(
      result => {
        this.user.picture = result;
      },
      error => {
        this.logOut();
      }
    );
  }
}
