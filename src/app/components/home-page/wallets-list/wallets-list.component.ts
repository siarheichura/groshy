import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
