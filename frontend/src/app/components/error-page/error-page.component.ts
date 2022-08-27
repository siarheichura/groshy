import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ROUTER } from '@shared/enums/Router.enum'

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  ROUTER = ROUTER

  constructor(private router: Router) {
  }

  handleClick(param: string): void {
    void this.router.navigate([param])
  }
}
