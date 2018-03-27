export class User {
  public static defaultPicture = "/assets/img/user.jpg";
  public static pictureLink = "user/picture/";
  id: string;
  token: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: any;
  role: string;

  constructor() {
    this.role = "GUEST";
    this.nickname = "Noname";
  }

  getCopy() {
    let user = new User();
    user.id = this.id;
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
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname;
    this.picture = user.picture;
    this.token = user.token;
    this.role = user.role;
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
  id: string;
  email: string;
  firstName: string;
}

export class UserUpdateModel {
  id: string;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  oldPassword: string;
  password: string;
  picture: string;

  constructor() { }

  fromUser(user: User): UserUpdateModel {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    return this;
  }
}

export class UserListing {
  id: string;
  picture: string;
  email: string;
  firstName: string;
  role: string;
  deleted: boolean;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.role = user.role;
    this.picture = user.picture;
  }

  getPicture() {
    return this.picture ? User.pictureLink + this.picture : User.defaultPicture;
  }
}