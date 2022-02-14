import { authLoadingSelector } from './../../store/user/user.selectros';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(authLoadingSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
