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

  update(user: any) {
    this.email = user.email || null;
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.nickname = user.nickname || null;
    this.picture = user.picture || "/assets/img/user.jpg";
    this.hash = user.hash || null;
    this.role = user.role || null;
    return this;
  }
}
