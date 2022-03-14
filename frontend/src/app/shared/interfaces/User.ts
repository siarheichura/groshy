export class SignUpUser {
  email: string;
  username: string;
  password: string;

  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
}

export class UserInfo {
  id: string;
  username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
