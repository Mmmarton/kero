import { Injectable } from '@angular/core';
import { User, UserInvitation } from './user.model';

@Injectable()
export class UserService {

  roles = ["GUEST", "MEMBER"];
  users: User[];

  constructor() {
    this.users = [];
    for (let i = 0; i < Math.random() * 5 + 1; i++) {
      this.users.push(this.generateUser());
    }
  }

  getUser(username: string) {
    return new User();
  }

  update(user: User) {
    //update user;
  }

  delete(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
  }

  private generateUser(): User {
    let user: User = new User();
    user.picture = 'https://lorempixel.com/' + this.random() + '/' + this.random() + '/';
    user.nickname = Math.random().toString(36).substring(7);
    user.firstName = Math.random().toString(36).substring(7);
    user.lastName = Math.random().toString(36).substring(7);
    user.email = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    user.role = this.roles[Math.round(Math.random())];
    return user;
  }

  private random() {
    return 80 + Math.round(Math.random() * 40);
  }
}
