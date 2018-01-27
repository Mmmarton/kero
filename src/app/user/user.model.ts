export class User {
  hash: string;
  username: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.hash = btoa(username + password);
  }
}
