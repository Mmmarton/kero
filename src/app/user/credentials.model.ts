export class Credentials {
  username: string;
  password: string;

  constructor() { }

  empty() {
    this.username = "";
    this.password = "";
  }
}