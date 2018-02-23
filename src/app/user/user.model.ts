export class User {
  token: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: any;
  role: string;

  constructor() {
    this.picture = "/assets/img/user.jpg";
    this.role = "GUEST";
  }

  getCopy() {
    let user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.token = this.token;
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
    this.token = user.token || null;
    this.role = user.role || null;
    return this;
  }
}

export class UserRegistration {
  username: string;
  password: string;
  password2: string;
  nickname: string;
  email: string;
  inviteCode: string;

  constructor() { }
}

export class UserInvitation {
  email: string;
  nickname: string;
}