import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { loadingSelector } from './store/shared/shared.selectros';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$: Observable<boolean> = this.store.select(loadingSelector);

  constructor(private store: Store) {}
}
