export interface User {
  id: string;
  username: string;
  emoji: string;
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

export interface Passwords {
  prevPassword: string;
  newPassword: string;
  confirmPassword: string;
}
