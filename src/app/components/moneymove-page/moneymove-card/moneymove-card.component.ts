import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moneymove-card',
  templateUrl: './moneymove-card.component.html',
  styleUrls: ['./moneymove-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
