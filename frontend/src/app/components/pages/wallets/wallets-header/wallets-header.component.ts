import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER } from "@shared/enums/Router.enum";
import { SVG } from "@shared/constants/svg-images";
import { NzIconService } from "ng-zorro-antd/icon";

@Component({
  selector: 'app-wallets-header',
  templateUrl: './wallets-header.component.html',
  styleUrls: ['./wallets-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsHeaderComponent implements OnInit {
  ROUTES = ROUTER

  constructor(
    private iconService: NzIconService
  ) {}

  ngOnInit(): void {
    this.iconService.addIconLiteral('ng-zorro:wallet', SVG.WALLET)
    this.iconService.addIconLiteral('ng-zorro:transfer', SVG.TRANSFER)
    this.iconService.addIconLiteral('ng-zorro:archive', SVG.ARCHIVE)
  }
}
