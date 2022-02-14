import { User } from './../../shared/interfaces/User';

export interface UserState {
  user: User;
  loading: boolean;
  isLogin: boolean;
  isRegistrate: boolean;
}

export const initialUserState: UserState = {
  user: {
    id: '',
    username: '',
  },
  loading: false,
  isLogin: false,
  isRegistrate: false,
};
