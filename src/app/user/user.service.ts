import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class UserService {

  roles = ["GUEST", "MEMBER"];

  constructor() { }

  getUser(username: string) {
    return new User();
  }

  getUsers(): User[] {
    let users = [];
    for (let i = 0; i < Math.random() * 5 + 10; i++) {
      users.push(this.generateUser());
    }
    return users;
  }

  update(user: User) {
    //update user;
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
