export class User {
  hash: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;

  constructor(username: string, password: string) {
    this.hash = btoa(username + password);
  }
}
