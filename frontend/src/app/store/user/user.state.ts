import { User } from './../../shared/interfaces/User';

export interface UserState {
  user: User;
  loading: boolean;
  login: boolean;
}

export const initialUserState: UserState = {
  user: {
    _id: '',
    email: '',
    username: '',
    password: '',
  },
  loading: false,
  login: false,
};
