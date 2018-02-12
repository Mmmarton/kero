export class User {
  hash: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;

  constructor() {
  }

  getCopy() {
    let user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.hash = this.hash;
    user.lastName = this.lastName;
    user.nickname = this.nickname;
    user.picture = this.picture;
    return user;
  }

  update(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname;
    this.picture = user.picture;
    this.hash = user.hash;
    return this;
  }
}
