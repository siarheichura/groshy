import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moneymove-body',
  templateUrl: './moneymove-body.component.html',
  styleUrls: ['./moneymove-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveBodyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
