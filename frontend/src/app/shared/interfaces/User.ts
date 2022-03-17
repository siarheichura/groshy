export interface User {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
}

export interface SignUpUser {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
