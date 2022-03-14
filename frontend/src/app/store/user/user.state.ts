import { User } from './../../shared/interfaces/User';

export interface UserState {
  user: User;
  isAuth: boolean;

  testUser: User;
}

export const initialUserState: UserState = {
  user: {} as User,
  isAuth: false,

  testUser: {} as User,
};
