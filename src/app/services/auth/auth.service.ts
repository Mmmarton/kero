import { Injectable } from '@angular/core';
import { User, UserUpdateModel } from '../../user/user.model';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials } from '../../user/credentials.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private api = "http://localhost:8080/api/";
  private user: User;
  private expirationDate: Date = new Date(Date.now() + (1000 * 60 * 60 * 24 * 10));

  constructor(private cookies: CookieService, private http: HttpClient, private router: Router) {
    this.user = new User();
    let savedUser = <User>cookies.getObject('user');
    if (savedUser) {
      this.getPictureOrLogOut(savedUser);
    }
    else {
      this.get("auth/session", "text").subscribe(r => { }, e => { });
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
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN') || "");
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.post<any>(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  put(url: string, object: any, type: any = 'json') {
    let headers = new HttpHeaders()
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN') || "");
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.put<any>(this.api + url, object, { headers: headers, withCredentials: true, responseType: type });
  }

  delete(url: string, type: any = 'json') {
    let headers = new HttpHeaders()
      .set('X-XSRF-TOKEN', <string>this.cookies.getObject('XSRF-TOKEN') || "");
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.delete<any>(this.api + url, { headers: headers, withCredentials: true, responseType: type });
  }

  get(url: string, type: any = 'json') {
    let headers = new HttpHeaders();
    if (this.user.token) {
      headers = headers.append('KERO_AUTH_TOKEN', this.user.token);
    }
    return this.http.get<any>(this.api + url, { headers: headers, withCredentials: true, responseType: type });
  }

  logIn(user: User) {
    this.user = user;
    if (this.user) {
      let user = this.user.getCopy();
      user.picture = null;
      this.cookies.putObject("user", user, { expires: this.expirationDate });
      this.getPicture().subscribe(
        response => {
          this.user.picture = response;
        },
        error => {

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

  updateUser(user: UserUpdateModel) {
    this.user.nickname = user.nickname;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    let userCookie = this.user.getCopy();
    userCookie.picture = null;
    this.cookies.putObject("user", userCookie, { expires: this.expirationDate });
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
      response => {
        this.user.picture = response;
      },
      error => {
        this.logOut();
      }
    );
  }
}
