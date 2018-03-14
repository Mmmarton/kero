export class User {
  public static defaultPicture = "/assets/img/user.jpg";
  public static pictureLink = "user/picture/";
  token: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: any;
  role: string;

  constructor() {
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
    this.picture = user.picture || null;
    this.token = user.token || null;
    this.role = user.role || null;
    return this;
  }

  getPicture() {
    return this.picture ? User.pictureLink + this.picture : User.defaultPicture;
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
  firstName: string;
}

export class UserUpdateModel {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  oldPassword: string;
  password: string;
  picture: string;

  constructor() { }

  fromUser(user: User): UserUpdateModel {
    this.email = user.email || null;
    this.nickname = user.nickname || null;
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    return this;
  }
}

export class UserListing {
  picture: string;
  email: string;
  firstName: string;
  role: string;

  constructor(user: any) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.role = user.role;
    this.picture = user.picture;
  }

  getPicture() {
    return this.picture ? User.pictureLink + this.picture : User.defaultPicture;
  }
}