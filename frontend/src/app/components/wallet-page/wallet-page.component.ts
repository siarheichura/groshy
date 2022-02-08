import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit {
  tabs = ['Expneses', 'Income'];

  constructor() {}

  ngOnInit(): void {}
}
