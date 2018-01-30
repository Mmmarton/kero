export class User {
  username: string;
  hash: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;

  constructor(username: string, password?: string) {
    this.username = username;
    this.hash = btoa(username + password);
  }
}
