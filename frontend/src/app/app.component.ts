import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { UntilDestroy } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { loadingSelector } from '@store/shared/shared.selectros'

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean> = this.store.select(loadingSelector)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }
}
