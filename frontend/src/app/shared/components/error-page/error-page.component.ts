import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from '../../enums/Router.enum';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  routes = RouterEnum;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleClick(param: string): void {
    void this.router.navigate([param]);
  }
}
