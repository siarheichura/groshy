import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moneymove-page',
  templateUrl: './moneymove-page.component.html',
  styleUrls: ['./moneymove-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymovePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
