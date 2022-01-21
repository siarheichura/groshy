import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-amount',
  templateUrl: './user-amount.component.html',
  styleUrls: ['./user-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAmountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
