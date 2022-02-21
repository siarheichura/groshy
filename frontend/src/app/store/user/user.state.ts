import { UserInfo } from './../../shared/interfaces/User';

export interface UserState {
  user: UserInfo;
}

export const initialUserState: UserState = {
  user: {
    id: '',
    username: '',
  },
};
