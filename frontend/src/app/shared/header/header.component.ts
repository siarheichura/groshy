import { RouterEnum } from './../enums/RouterEnum';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  homePageRoute = RouterEnum.Index;
  statisticsPageRoute = RouterEnum.Statistics;

  constructor() {}

  ngOnInit(): void {}
}
