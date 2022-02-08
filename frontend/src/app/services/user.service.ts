import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private authService: AuthService) {}

  get user(): { id: string; username: string } {
    return this.authService.jwtDecode();
  }
}
