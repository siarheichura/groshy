import { User } from '../models/User';

export class UserDto {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;

  constructor(model: User) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
