import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { archivedWalletsSelector } from '@store/wallets/wallets.selectros'
import { Wallet } from '@shared/interfaces/Wallet.interface'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent implements OnInit {
  archivedWallets$: Observable<Wallet[]> = this.store.select(archivedWalletsSelector)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }
}
