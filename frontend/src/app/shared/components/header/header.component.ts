import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from '../../enums/RouterEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  routes = RouterEnum;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleRouteClick(param: string): void {
    this.router.navigate([param]);
  }
}
