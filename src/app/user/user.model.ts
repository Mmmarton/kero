export class User {
  hash: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: string;

  constructor() {
    this.picture = "/assets/img/user.jpg";
    this.role = "GUEST";
  }

  getCopy() {
    let user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.hash = this.hash;
    user.lastName = this.lastName;
    user.nickname = this.nickname;
    user.picture = this.picture;
    user.role = this.role;
    return user;
  }

  update(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname;
    this.picture = user.picture;
    this.hash = user.hash;
    this.role = user.role;
    return this;
  }
}
