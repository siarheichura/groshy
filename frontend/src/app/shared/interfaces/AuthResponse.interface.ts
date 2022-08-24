import { User } from '@shared/interfaces/User'

export interface AuthResponse {
  token: string
  user: User
}
