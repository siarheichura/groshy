import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  authLoading: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authLoading$.subscribe({
      next: (response) => {
        this.authLoading = response;
      },
    });
  }
}
