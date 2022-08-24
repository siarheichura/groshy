import { User } from '@shared/interfaces/User'

export interface UserState {
  user: User
  isAuth: boolean
}

export const initialUserState: UserState = {
  user: null,
  isAuth: false,
}
